const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 6,
    maxlength: 16,
    required: true,
  },
  username: {
    unique: true,
    type: String,
    minlength: 6,
    maxlength: 16,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter Valid Email");
      }
    },
  },
  password: {
    type: String,
    minlength: 8,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  notes: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRETKEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const RegisterSchema = new mongoose.model("RegisterSchema", schema);
module.exports = RegisterSchema;
