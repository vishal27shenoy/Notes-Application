const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const mongoose = require("mongoose");
const DB = require("./schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.use(cookieParser());
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, username, email, password } = req.body;
  DB.findOne({ email: email } || { username: username }, async (err, user) => {
    if (user) {
      if (user.email == email) {
        console.log("email already exist");
        res.send({ message: "Email already exist !", msgcode: 400 });
      } else if (user.username == username) {
        console.log("username already exist");
        res.send({ message: "Username already exist !", msgcode: 400 });
      }
    } else {
      const SchemaValue = new DB({
        name: name,
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      var token = await SchemaValue.generateAuthToken();

      console.log(token);
      SchemaValue.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res
            .send({ message: "Sucessfull", id: SchemaValue._id, JWT: token })
            .status(400);
        }
      });
    }
  });
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email != null && password != null) {
    const user = await DB.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (isMatch) {
        const token = await user.generateAuthToken();
        res.send({
          message: "Sucessfull",
          msgcode: 200,
          id: user._id,
          JWT: token,
        });
      } else {
        res.send({ message: "Invalid login Cradential", msgcode: 400 });
      }
    } else {
      res.send({ message: "Invalid login Cradential", msgcode: 400 });
    }
  }
});

router.post("/check", async (req, res) => {
  const token = req.body;
  console.log(token.jwt);

  const verify = jwt.verify(token.jwt, process.env.SECRETKEY);
  console.log(verify);
  if (verify._id) {
    const user = DB.findOne({ _id: verify._id });
    if (user) {
      console.log("valid user");
      res.send({ message: "valid user", msgcode: 200 });
    } else {
      console.log("Invalid user");
      res.send({ message: "Invalid user", msgcode: 400 });
    }
    console.log(verify);
  }
});

module.exports = router;
