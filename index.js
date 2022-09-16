const express = require("express");
const mongoose = require("mongoose");
const app = express();
const DB = require("./schema");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const router = require("./routes");
const operations = require("./operations");
mongoose
  .connect("mongodb://0.0.0.0:27017/RegisterSchema", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Sucessfull of DB"))
  .catch((err) => console.log(err));

app.use(router);
app.use(operations);

app.listen(port, (req, res) => {
  console.log("Server Connected at port ", port);
});
