require("dotenv").config();
require("express-async-errors");

const path = require("path");
const express = require("express");
const app = express();

// Security and sanitization packages
const helmet = require("helmet");
const xss = require("xss-clean");

// Additional packages
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

// Cloudinary configuration
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Database connection
const connectDB = require("./db/connect");

// Routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const contactRouter = require("./routes/contactRoutes");
const postRouter = require("./routes/postRoutes");

// Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Global middleware setup
app.set("trust proxy", 1); // Enable if behind a proxy (e.g., Heroku)
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser(process.env.JWT_SECRET)); // Parse and sign cookies
app.use(fileUpload({ useTempFiles: true })); // Handle file uploads
app.use(morgan("tiny")); // HTTP request logger
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
        ],
        fontSrc: ["'self'", "https://unpkg.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        frameSrc: ["'self'", "https://www.google.com"], // Permitir Google en iframes
        // Agrega otras directivas necesarias
      },
    },
  })
); // Security headers
app.use(xss()); // Prevent cross-site scripting attacks

// Serve static files
app.use(express.static(path.resolve(__dirname, "./client/")));
app.use(express.static(path.join(__dirname, "client/new-clinic-front/dist")));

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/posts", postRouter);

// Catch-all route to serve the frontend
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client/new-clinic-front/dist", "index.html")
  );
});

// Error-handling middleware
app.use(notFoundMiddleware); // Handle 404 errors
app.use(errorHandlerMiddleware); // Handle other errors

// Start the server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // Connect to the database
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error); // Log errors during server startup
  }
};

start();
