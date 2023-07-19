/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUserByUsername,
  createUser,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
} = require("../db");
const {
  UnauthorizedError,
  UserTakenError,
  PasswordTooShortError,
} = require("../errors");

const { JWT_SECRET = "neverTell" } = process.env;
// Generate a JSON Web Token
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1h", // or whatever time limit you want on tokens
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

// Register a new user
// Register a new user
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // console.log(req.body);

    // Check if the username is already taken
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      // console.log(existingUser);
      return res.status(400).json({
        error: UserTakenError(username),
        message: UserTakenError(username),
        name: UserTakenError(username),
      });
    }
    // console.log(password);
    // Check if the password is at least 8 characters long
    if (password.length <= 8) {
      return res.status(400).json({
        error: PasswordTooShortError(),
        message: PasswordTooShortError(),
        name: PasswordTooShortError(),
      });
    }

    // Hash the password and create a new user
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ username, password });

    // Generate a token for the user
    // const token = jwt.sign({ id: user.id, username });
    // console.log(token);

    // Return the response object with the correct properties
    return res.json({
      message: "Thanks for signing up for our service.",
      token: generateToken(user),
      user,
      // user: { id: user.id, username: user.username },
    });
  } catch (error) {
    next(error);
  }
});

// Login user
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedError();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError();
    }

    res.json({
      token: generateToken({ id: user.id, username: user.username }),
      user: { id: user.id, username: user.username },
      message: "you're logged in!",
    });
  } catch (error) {
    next(error);
  }
});

// Get user profile
router.get("/me", async (req, res, next) => {
  const bearer = "Bearer ";
  const auth = req.headers.authorization;
  let token;
  if (auth) {
    token = auth.slice(bearer.length);
  }
  if (!token) {
    res.status(401);
    return res.json({
      error: UnauthorizedError(),
      message: UnauthorizedError(),
      name: UnauthorizedError(),
    });
  }
  try {
    const { id, username } = jwt.verify(token, JWT_SECRET);
    res.send({ id, username, active: true });
  } catch (error) {
    next(error);
  }
});

// Get public routines for a particular user
router.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;
  // console.log(req.user);
  // console.log(username);
  try {
    if (req.user.username === username) {
      const routines = await getAllRoutinesByUser(username);
      res.send(routines);
    } else {
      const publicRoutine = await getPublicRoutinesByUser(username);
      res.send(publicRoutine);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
