/* eslint-disable no-useless-catch */
const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT * FROM routines WHERE id = $1;
    `,
      [id]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName",
        array_agg(json_build_object(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routine_activities.duration,
          'count', routine_activities.count,
          'routineId', routine_activities."routineId",
          'routineActivityId', routine_activities.id
        ) ORDER BY routine_activities.id) AS activities
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
      LEFT JOIN activities ON routine_activities."activityId" = activities.id
      GROUP BY routines.id, users.id;
    `);

    return routines.map((routine) => {
      const { id, creatorId, isPublic, name, goal, creatorName, activities } =
        routine;

      return {
        id,
        creatorId,
        isPublic,
        name,
        goal,
        creatorName,
        activities: activities.filter((activity) => activity.id !== null),
      };
    });
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName",
        json_agg(
          json_build_object(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count,
            'routineId', routine_activities."routineId",
            'routineActivityId', routine_activities.id
          )
        ) AS activities
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
      LEFT JOIN activities ON routine_activities."activityId" = activities.id
      WHERE routines."isPublic" = true
      GROUP BY routines.id, users.id;
    `);

    return routines.map((routine) => {
      const { id, creatorId, isPublic, name, goal, creatorName, activities } =
        routine;

      return {
        id,
        creatorId,
        isPublic,
        name,
        goal,
        creatorName,
        activities: activities.filter((activity) => activity.id !== null),
      };
    });
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
        json_agg(
          json_build_object(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count,
            'routineId', routine_activities."routineId",
            'routineActivityId', routine_activities.id
          )
        ) AS activities
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
      LEFT JOIN activities ON routine_activities."activityId" = activities.id
      WHERE users.username = $1
      GROUP BY routines.id, users.id;
    `,
      [username]
    );

    return routines.map((routine) => {
      const { id, creatorId, isPublic, name, goal, creatorName, activities } =
        routine;

      return {
        id,
        creatorId,
        isPublic,
        name,
        goal,
        creatorName,
        activities: activities.filter((activity) => activity.id !== null),
      };
    });
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: publicRoutines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
        json_agg(
          json_build_object(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count,
            'routineId', routine_activities."routineId",
            'routineActivityId', routine_activities.id
          )
        ) AS activities
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
      LEFT JOIN activities ON routine_activities."activityId" = activities.id
      WHERE users.username = $1 AND routines."isPublic" = true
      GROUP BY routines.id, users.id;
    `,
      [username]
    );

    return publicRoutines.map((routine) => {
      const { id, creatorId, isPublic, name, goal, creatorName, activities } =
        routine;

      return {
        id,
        creatorId,
        isPublic,
        name,
        goal,
        creatorName,
        activities: activities.filter((activity) => activity.id !== null),
      };
    });
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: publicRoutines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
        json_agg(
          json_build_object(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count,
            'routineId', routine_activities."routineId",
            'routineActivityId', routine_activities.id
          )
        ) AS activities
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      JOIN activities ON routine_activities."activityId" = activities.id
      JOIN users ON routines."creatorId" = users.id
      WHERE routine_activities."activityId" = $1 AND routines."isPublic" = true
      GROUP BY routines.id, users.id;
    `,
      [id]
    );

    if (publicRoutines.length === 0) {
      throw new Error("No public routines found for the activity");
    }

    return publicRoutines.map((routine) => {
      const { id, creatorId, isPublic, name, goal, creatorName, activities } =
        routine;

      return {
        id,
        creatorId,
        isPublic,
        name,
        goal,
        creatorName,
        activities: activities.filter((activity) => activity.id !== null),
      };
    });
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");
    const values = Object.values(fields);
    const {
      rows: [routine],
    } = await client.query(
      `
      UPDATE routines
      SET ${setString}
      WHERE id = $1
      RETURNING *;
    `,
      [id, ...values]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    // Delete routine_activities first
    await client.query(
      `
      DELETE FROM routine_activities WHERE "routineId" = $1;
    `,
      [id]
    );

    // Delete the routine
    await client.query(
      `
      DELETE FROM routines WHERE id = $1;
    `,
      [id]
    );

    return;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
