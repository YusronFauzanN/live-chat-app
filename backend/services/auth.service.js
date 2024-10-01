import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signUpHandler = async (req, res) => {
  try {
    const { username, fullname, password, gender } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const profilePicBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profilePicGirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      fullname,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? profilePicBoy : profilePicGirl,
    });

    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        message: "User created successfully!",
        user: newUser,
      });
    } else {
      res.status(400).json({ message: "Invalid user data received!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signInHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials!" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutHandler = (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });

    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
