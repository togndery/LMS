import user from "../models/user.js";
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      return res.status(400).send("Name is required");
    }
    if (!email) {
      return res.status(400).send("Email is required");
    }

    if (!password) {
      return res.status(400).send("password is required");
    }

    let userExsit = await User.findOne({ email }).exec();

    if (userExsit) {
      return res.status(400).send("Email is taken");
    }

    //haspawword
    const userhashedPassword = await hashPassword(password);

    //register

    const user = await new User({
      name,
      email,
      password: userhashedPassword,
    }).save();

    console.log("create new user", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log("***************");
    console.log(error);
    return res.status(400).send("error in server");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //cheack if user exsit
    const userexsit = await User.findOne({ email }).exec();
    if (!userexsit) {
      return res.status(400).send("No User Found");
    }
    //chaeck password

    const matchuserPassword = comparePassword(password, userexsit.password);
    console.log("is Password match", matchuserPassword);
    //create JWT
    const userToken = jwt.sign({ _id: userexsit._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //return user and token
    userexsit.password = undefined;
    res.cookie("token", userToken, {
      httpOnly: true,
    });
    //send user
    res.json(userexsit);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error 500");
  }
};
