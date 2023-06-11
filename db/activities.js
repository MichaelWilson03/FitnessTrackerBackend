/* eslint-disable no-useless-catch */
const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  try {
    const lowercaseName = name.toLowerCase(); // Lowercase the activity name for uniqueness
    const capitalizedName =
      lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1); // Capitalize the first letter
    const {
      rows: [activity],
    } = await client.query(
      `
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [capitalizedName, description]
    );
    activity.name = capitalizedName; // Update the activity name to capitalized before returning
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      SELECT * FROM activities WHERE id = $1;
    `,
      [id]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    const lowercaseName = name.toLowerCase(); // Lowercase the activity name for case-insensitive search
    const {
      rows: [activity],
    } = await client.query(
      `
      SELECT * FROM activities WHERE LOWER(name) = $1;
    `,
      [lowercaseName]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function attachActivitiesToRoutines(routines) {
  try {
    const routineIds = routines.map((routine) => routine.id);
    const { rows: routineActivities } = await client.query(
      `
      SELECT * FROM routine_activities WHERE "routineId" = ANY($1);
    `,
      [routineIds]
    );

    const routinesWithActivities = routines.map((routine) => {
      routine.activities = routineActivities.filter(
        (activity) => activity.routineId === routine.id
      );
      return routine;
    });

    return routinesWithActivities;
  } catch (error) {
    throw error;
  }
}

async function updateActivity({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");
    const values = Object.values(fields);
    const {
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET ${setString}
      WHERE id = $1
      RETURNING *;
    `,
      [id, ...values]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
