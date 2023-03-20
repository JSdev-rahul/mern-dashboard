const users = require("../model/users");
const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";
const userSignUp = async (req, res) => {
  console.log("req",req.body)
  const { fname,lname, email, password } = req.body.data;
  try {
    const newData = await users.create({
      fname,
      lname,
      email,
      password,
      createdAt: Date.now(),
    });
    await newData.save();
      jwt.sign({ newData }, jwtkey, { expiresIn: "1h" }, (err, token) => {
      res.send({ newData, access_token: token });
    });
    // res.status(200).json(newData);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
module.exports = userSignUp;
