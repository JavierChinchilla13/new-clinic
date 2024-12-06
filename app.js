require("dotenv").config();
require("express-async-errors");

const path = require("path");
const express = require("express");
const app = express();

// Seguridad y limpieza
const helmet = require("helmet");
const xss = require("xss-clean");

// Paquetes adicionales
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

// Configuración de Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Conexión a la base de datos
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

// Configuración de seguridad
app.set("trust proxy", 1); // Para proxies como Heroku
app.use(express.json()); // Parsear JSON
app.use(cookieParser(process.env.JWT_SECRET)); // Cookies firmadas
app.use(fileUpload({ useTempFiles: true })); // Subida de archivos
app.use(morgan("tiny")); // Logger de solicitudes HTTP

// Configuración de Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
        ],
        fontSrc: ["'self'", "https://unpkg.com"],
        imgSrc: ["'self'", "data:", "https:"],
        frameSrc: ["'self'", "https://www.google.com"], // Permite cargar Google en iframes
      },
    },
  })
);
app.use(xss()); // Protección contra XSS

// Middleware para tipos MIME correctos
app.use((req, res, next) => {
  if (req.path.endsWith(".js")) {
    res.type("application/javascript");
  } else if (req.path.endsWith(".css")) {
    res.type("text/css");
  }
  next();
});

// Servir archivos estáticos
app.use(
  express.static(path.resolve(__dirname, "client/new-clinic-front/dist"))
);

// Rutas de API
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/posts", postRouter);

// Ruta para SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client/new-clinic-front/dist", "index.html")
  );
});

// Middleware de errores
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Inicialización del servidor
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
