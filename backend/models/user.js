const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
  /** authenticate (login) user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/
  static async authenticate(username, password) {
    //try to find user first
    const result = await db.query(
      `SELECT username,
                password,
                first_name,
                last_name,
                email,
                is_admin
        FROM users
        WHERE username = $1`,
      [username]
    );
    const user = result.rows[0];
    if (user) {
      // compare hashed password to stored password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws BadRequestError on duplicates.
   **/
  static async register({
    username,
    password,
    first_name,
    last_name,
    email
  }) {
    const duplicateCheck = await db.query(
      `SELECT username
        FROM users
        WHERE username = $1`,
      [username]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
             (username,
              password,
              first_name,
              last_name,
              email)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING username, first_name, last_name, email`,
      [username, hashedPassword, first_name, last_name, email]
    );
    const user = result.rows[0];

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, favorites }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
                  first_name,
                  last_name,
                  email,
                  is_admin
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** return data about all users.
   *
   * Returns { username, first_name, last_name, email, favorites }
   *
   **/
  static async getAll(){
    const results = await db.query(
      `SELECT username,
                first_name,
                last_name,
                email
        FROM users
        ORDER BY username`
    );
    return results.rows;
  }  

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { first_name, last_name, password, email, favorites, is_admin}
   *
   * Returns { username, first_name, last_name, password, email, favorites, is_admin }
   *
   * Throws NotFoundError if not found.
   *
   */
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      first_name: "first_name",
      last_name: "last_name",
      email: "email",
      favorites: "favorites",
      is_admin: "is_admin",
    });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name,
                                last_name,
                                email,
                                is_admin`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */
  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** Add an exercise to user's favorites.
   *
   * Returns { first_name, last_name, password, email, favorites, is_admin }
   *
   * Throws NotFoundError if user not found.
   **/
  static async addToFavorites(username, exerciseId) {
    // Check if user exists
    const userRes = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
      [username]
    );
    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    // Check if exercise exists
    const exerciseRes = await db.query(
      `SELECT id
       FROM exercises
       WHERE id = $1`,
      [exerciseId]
    );
    const exercise = exerciseRes.rows[0];

    if (!exercise) throw new NotFoundError(`No exercise with ID: ${exerciseId}`);

    // Add exercise to favorites
    await db.query(
      `INSERT INTO user_favorites (user_id, exercise_id)
       VALUES ((SELECT id FROM users WHERE username = $1), $2)`,
      [username, exerciseId]
    );

    return await this.get(username);
  }

  /** Remove an exercise from user's favorites.
   *
   * Returns { first_name, last_name, password, email, favorites, is_admin }
   *
   * Throws NotFoundError if user not found or exercise not in favorites.
   **/
  static async removeFromFavorites(username, exerciseId) {
    // Check if user exists
    const userRes = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
      [username]
    );
    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    // Check if exercise exists in user's favorites
    const favoriteRes = await db.query(
      `SELECT user_id, exercise_id
       FROM user_favorites
       WHERE user_id = (SELECT id FROM users WHERE username = $1) AND exercise_id = $2`,
      [username, exerciseId]
    );
    const favorite = favoriteRes.rows[0];

    if (!favorite) {
      throw new NotFoundError(
        `Exercise with ID ${exerciseId} not found in ${username}'s favorites.`
      );
    }

    // Remove exercise from favorites
    await db.query(
      `DELETE FROM user_favorites
       WHERE user_id = (SELECT id FROM users WHERE username = $1) AND exercise_id = $2`,
      [username, exerciseId]
    );

    return await this.get(username);
  }
}

module.exports = User;

