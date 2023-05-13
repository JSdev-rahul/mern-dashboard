const users = require("../model/users.js");
const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";
const login = async (req, resp) => {
  // second commit 
  try {
    if (req.body.password && req.body.email) {
      let result = await users.findOne(req.body).select("-password");
      if (result) {
        jwt.sign({ result }, jwtkey, { expiresIn: "5h" }, (err, token) => {
          resp.send({ result, access_token: token });
        });
      } else resp.status(400).send({ message: "no user found", status: 400 });
    } else resp.status(400).send({ message: "not found" });
  } catch (err) {
    resp.status(500).json(err.message);
  }
};
module.exports = login;
