const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const rootRouter = require("./rootRouter");
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json({ limit: '10kb'}));
app.use(express.urlencoded({ extended: false, limit: '10kb' }))
app.use("/api", rootRouter);

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MondoDb Sucessfully");
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error Connecting to Mongo");
    console.log(err);
  });
