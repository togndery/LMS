import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/auth.js";

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
