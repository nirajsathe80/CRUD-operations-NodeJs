const asyncHandler = require("express-async-handler");
const USER = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleSignupUser = asyncHandler(async function (req, res) {
  const { username, email, password } = req.body;
  if (!username) {
    res.status(400);
    throw new Error("Username must be provided");
  } else if (!email) {
    res.status(400);
    throw new Error("Email must be provided");
  } else if (!password) {
    res.status(400);
    throw new Error("Password must be provided");
  }
  const user = await USER.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hashing the password for security purposes
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await USER.create({
    email,
    password: hashedPassword,
    username,
  });
  if (newUser) {
    return res
      .status(201)
      .json({ status: 201, message: " User registered successfully" });
  } else {
    res.status(400);
    throw new Error("Failed to create user please retry");
  }
});

const handleLoginUser = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email must be provided");
  } else if (!password) {
    throw new Error("Password must be provided");
  }

  const user = await USER.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found please signup first");
  }

  //compering hashed password

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    res.status(400);
    throw new Error("Password not matched");
  }

  const accessToken = jwt.sign(
    {
      user: {
        email: user.email,
        username: user.username,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  return res
    .status(200)
    .json({ accessToken, message: "User login successful" });
});

const handleCurrentUserDetails = asyncHandler(async function (req, res) {
  const user = req.user;
  return res.status(200).json(user);
});

module.exports = {
  handleCurrentUserDetails,
  handleLoginUser,
  handleSignupUser,
};
