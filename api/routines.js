const express = require("express");
const router = express.Router();
const Routine = require("../db/routines");
const User = require("../db/users");

// GET /api/routines
router.get("/", async (req, res, next) => {
  try {
    const routines = await Routine.find().populate("activities");
    res.json(routines);
  } catch (error) {
    next(error);
  }
});

// POST /api/routines
router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const routine = await Routine.create({
      title,
      description,
      creatorId: userId,
    });

    res.status(201).json(routine);
  } catch (error) {
    next(error);
  }
});

// GET /api/routines/:routineId
router.get("/:routineId", async (req, res, next) => {
  try {
    const { routineId } = req.params;

    const routine = await Routine.findById(routineId).populate("activities");

    if (!routine) {
      return res.status(404).json({ error: "Routine not found" });
    }

    res.json(routine);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/routines/:routineId
router.patch("/:routineId", async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { title, description, isPublic, goal } = req.body;

    const updatedRoutine = await Routine.findByIdAndUpdate(
      routineId,
      { title, description, isPublic, goal },
      { new: true }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ error: "Routine not found" });
    }

    res.json(updatedRoutine);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/routines/:routineId
router.delete("/:routineId", async (req, res, next) => {
  try {
    const { routineId } = req.params;

    const deletedRoutine = await Routine.findByIdAndDelete(routineId);

    if (!deletedRoutine) {
      return res.status(404).json({ error: "Routine not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// POST /api/routines/:routineId/activities
router.post("/:routineId/activities", async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { activityId } = req.body;

    const routine = await Routine.findById(routineId);

    if (!routine) {
      return res.status(404).json({ error: "Routine not found" });
    }

    if (routine.activities.includes(activityId)) {
      return res
        .status(400)
        .json({ error: "Activity already exists in the routine" });
    }

    routine.activities.push(activityId);
    await routine.save();

    const populatedRoutine = await Routine.findById(routineId).populate(
      "activities"
    );

    res.json(populatedRoutine);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
