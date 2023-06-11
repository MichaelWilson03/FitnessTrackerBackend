const express = require("express");
const router = express.Router();
const {
  getAllActivities,
  createActivity,
  updateActivity,
  getActivityById,
  getActivityByName,
  getPublicRoutinesByActivity,
} = require("../db");
const { ActivityNotFoundError, ActivityExistsError } = require("../errors");

// GET /api/activities/:activityId/routines
router.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;

  try {
    const activity = await getActivityById(activityId);

    if (!activity) {
      return res.status(404).json({
        error: ActivityNotFoundError(activityId),
        message: ActivityNotFoundError(activityId),
        name: "NotFound",
      });
    }

    const routines = await getPublicRoutinesByActivity({ id: activityId });

    res.json(routines);
  } catch (error) {
    next(error);
  }
});

// GET /api/activities
router.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// POST /api/activities
router.post("/", async (req, res, next) => {
  const { name, description } = req.body;

  try {
    const existingActivity = await getActivityByName(name);

    if (existingActivity) {
      return res.status(400).json({
        error: ActivityExistsError(name),
        message: ActivityExistsError(name),
        name: "Conflict",
      });
    }

    const newActivity = await createActivity({ name, description });
    res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/activities/:activityId
router.patch("/:activityId", async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;

  try {
    const activity = await getActivityById(activityId);

    if (!activity) {
      return res.status(404).json({
        error: ActivityNotFoundError(activityId),
        message: ActivityNotFoundError(activityId),
        name: "NotFound",
      });
    }

    const existingActivity = await getActivityByName(name);

    if (existingActivity && existingActivity.id !== activity.id) {
      return res.status(400).json({
        error: ActivityExistsError(name),
        message: ActivityExistsError(name),
        name: "Conflict",
      });
    }

    const updatedActivity = await updateActivity({
      id: activityId,
      name,
      description,
    });
    res.json(updatedActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
