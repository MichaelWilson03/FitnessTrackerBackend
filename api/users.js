const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUserByUsername,
  createUser,
  getUserWithRoutinesById,
  getPublicRoutinesByUser,
  createRoutine,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
} = require("../db");
const {
  UnauthorizedError,
  UserTakenError,
  PasswordTooShortError,
} = require("../errors");

// Generate a JSON Web Token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body.user; // Extract the username and password from the nested "user" object

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      throw new UserTakenError(username);
    }

    if (password.length < 8) {
      throw new PasswordTooShortError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ username, password: hashedPassword });
    const token = generateToken({ id: user.id, username: user.username });

    // Return the response object with the correct properties
    res.json({
      success: true,
      error: null,
      data: {
        token,
        message: "Thanks for signing up for our service.",
      },
    });
  } catch (error) {
    next(error);
  }
});

// Login user
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedError();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError();
    }

    const token = generateToken({ id: user.id, username: user.username });

    res.json({
      message: "You're logged in!",
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    next(error);
  }
});

// Get user profile
router.get("/me", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getUserWithRoutinesById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ id: user.id, username: user.username });
  } catch (error) {
    next(error);
  }
});

// Get public routines for a particular user
router.get("/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const routines = await getPublicRoutinesByUser(user.id);

    res.json(routines);
  } catch (error) {
    next(error);
  }
});

// Create a new routine for the logged-in user
router.post("/routines", async (req, res, next) => {
  try {
    const { name, goal } = req.body;
    const { id: creatorId } = req.user;

    const routine = await createRoutine({
      creatorId,
      isPublic: false,
      name,
      goal,
    });

    res.json(routine);
  } catch (error) {
    next(error);
  }
});

// Add an activity to a routine
router.post("/routines/:routineId/activities", async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { activityId, count, duration } = req.body;

    const routineActivity = await addActivityToRoutine({
      routineId,
      activityId,
      count,
      duration,
    });

    res.json(routineActivity);
  } catch (error) {
    next(error);
  }
});

// Get activities for a routine
router.get("/routines/:routineId/activities", async (req, res, next) => {
  try {
    const { routineId } = req.params;

    const activities = await getRoutineActivitiesByRoutine(routineId);

    res.json(activities);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  router,
  generateToken,
};
