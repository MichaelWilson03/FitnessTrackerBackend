const express = require("express");
const router = express.Router();

// Import the necessary models and error classes
const {
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
} = require("../db/routine_activities");
const {
  UnauthorizedUpdateError,
  UnauthorizedDeleteError,
} = require("../errors");

// PATCH /routine_activities/:routineActivityId
router.patch("/:routineActivityId", async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;

    // Check if the logged-in user can edit the routine activity
    const canEdit = await canEditRoutineActivity(
      routineActivityId,
      req.user.id
    );
    if (!canEdit) {
      throw new UnauthorizedUpdateError(
        "User is not allowed to update this routine activity"
      );
    }

    // Update the routine activity
    const updatedRoutineActivity = await updateRoutineActivity(
      routineActivityId,
      count,
      duration
    );

    // Send the response
    res.json(updatedRoutineActivity);
  } catch (error) {
    next(error);
  }
});

// DELETE /routine_activities/:routineActivityId
router.delete("/:routineActivityId", async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;

    // Check if the logged-in user can delete the routine activity
    const canDelete = await canEditRoutineActivity(
      routineActivityId,
      req.user.id
    );
    if (!canDelete) {
      throw new UnauthorizedDeleteError(
        "User is not allowed to delete this routine activity"
      );
    }

    // Delete the routine activity
    await destroyRoutineActivity(routineActivityId);

    // Send the response
    res.json({ success: true, id: routineActivityId });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
