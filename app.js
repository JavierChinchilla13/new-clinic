require("dotenv").config();
require("express-async-errors");

const path = require("path");
// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const express = require("express");
const app = express();

// rest of the package
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// file upload
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const contactRouter = require("./routes/contactRoutes");
const postRouter = require("./routes/postRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.set("trust proxy", 1);

app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.resolve(__dirname, "./client/")));
app.use(express.json());
app.use(helmet());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/posts", postRouter);

//Esto Para el front

// Configura Express para servir los archivos estáticos del frontend en `dist`
app.use(express.static(path.join(__dirname, "client/new-clinic-front/dist")));

//---
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client/new-clinic-front/dist", "index.html")
  );
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
