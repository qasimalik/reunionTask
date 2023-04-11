require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require("../models/user");


exports.authenticate = async (req, res) => {
  try{
    const {email , password} = req.body;
    console.log(email, password)
    userName = email.split("@")[0];
    let user = await User.create({email, password, userName});
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(user, token);
    res.cookie("token", token);
    res.send("User successfully created");
  } catch(err) {
    console.log(err);
    res.status(500).send("Error logging in");
  }
};