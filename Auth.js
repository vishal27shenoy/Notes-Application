const jwt = require("jsonwebtoken");
const schema = require("./schema");
const auth = async (req, res, next) => {
  try {
    const token = req.body;
  } catch (error) {
    res.status(401).send(error);
  }
};
