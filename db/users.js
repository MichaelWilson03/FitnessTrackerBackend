/* eslint-disable no-useless-catch */
const client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
const { UserTakenError, PasswordTooShortError } = require("../errors"); // Add the import statement for PasswordTooShortError

async function createUser({ username, password }) {
  try {
    if (password.length < 8) {
      throw new PasswordTooShortError();
    }

    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const query = `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      RETURNING id, username;
    `;
    const values = [username, hashedPassword];
    const { rows } = await client.query(query, values);
    const user = rows[0];
    return user;
  } catch (error) {
    if (error.constraint === "users_username_key") {
      throw new UserTakenError(username);
    } else {
      throw error;
    }
  }
}

// ...

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username.toLowerCase());
    if (!user) {
      return null;
    }
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const query = `
      SELECT id, username FROM users WHERE id = $1;
    `;
    const values = [userId];
    const { rows } = await client.query(query, values);
    const user = rows[0];
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const query = `
      SELECT * FROM users WHERE LOWER(username) = LOWER($1);
    `;
    const values = [username];
    const { rows } = await client.query(query, values);
    const user = rows[0];
    return user;
  } catch (error) {
    throw error;
  }
}

function generateAuthToken(user) {
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  generateAuthToken,
};
