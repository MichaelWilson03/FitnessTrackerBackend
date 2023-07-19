const express = require("express");
const cors = require("cors");
const activitiesRouter = require("./api/activities");
const usersRouter = require("./api/users.js"); // Import the router from users.js
const routinesRouter = require("./api/routines");
// const { router: routineActivitiesRouter } = require("./api/routine_activities");
const routineActivitiesRouter = require("./api/routineActivities");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all origins

// API Routes
app.use("/api/activities", activitiesRouter);
app.use("/api/users", usersRouter);
app.use("/api/routines", routinesRouter);
app.use("/api/routineActivities", routineActivitiesRouter);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ message: "API is healthy" });
});

// Route handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
