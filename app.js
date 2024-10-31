require("dotenv").config();
require("express-async-errors");

const path = require("path");
// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const express = require("express");
const app = express();

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
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const contactsRouter = require("./routes/contacts");
const postsRouter = require("./routes/posts");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./client/")));
app.use(express.json());
app.use(helmet());
app.use(xss());

// serve HTML at root
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome</title>
    </head>
    <body>
      <h1>Welcome to the Product API</h1>
      <p>Explore our API by visiting the following endpoints:</p>
      <ul>
        <li><a href="/api/v1/products">/api/v1/products</a></li>
        <li><a href="/api/v1/auth">/api/v1/auth</a></li>
      </ul>
    </body>
    </html>
  `);
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1/posts", postsRouter);

//En esta parte cambiar para conectar al front end
/*app.get('*', (req,res)=> {
  res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})*/

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
