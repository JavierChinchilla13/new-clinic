require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// routers

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());

const port = process.env.PORT || 5000;

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
