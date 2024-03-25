const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const axios = require("axios");

class Exercise {
  /** Given a exercise id, return data about exercise.
   *
   * Returns { name, target, secondary[], gif, instructions[] }
   *
   **/
  static async get(id) {
    const result = await db.query(
      `SELECT name,
                  target,
                  secondary,
                  gif,
                  instructions
           FROM exercises
           WHERE id = $1`,
      [id]
    );
    const exercise = result.rows[0];
    if (!exercise) throw new NotFoundError(`No exercise with id: ${id}`);
    return exercise;
  }

  /** Returns all exercises.
   *
   * Returns { name, target, secondary[], gif, instructions[] }
   *
   * Throws BadRequestError if exercise not found.
   **/
  static async getAll() {
    const result = await db.query(
      `SELECT name,
                target,
                secondary,
                gif,
                instructions
        FROM exercises`
    );
    if (!result.rows) throw new BadRequestError("Can't retrieve exercises");
    return result.rows;
  }

  /** Returns all targets.
   *
   * Returns { targets }
   *
   * Throws BadRequestError if exercise not found.
   **/
  static async getTargets() {
    const result = await db.query(
      `SELECT DISTINCT target 
      FROM exercises
      ORDER BY target`
    );
    if (!result.rows) throw new BadRequestError("Can't retrieve targets");
    return result.rows;
  }

  /** Returns all exercises for target.
   *
   * Returns target => [{id, name, target, secondary, gif, instructions}, ...}]
   *
   * Throws BadRequestError if exercise not found.
   **/
  static async getTargetExercises(target) {
    const result = await db.query(
      `SELECT id,
      name,
      target,
      secondary,
      gif,
      instructions
      FROM exercises
      WHERE target = $1`,
      [target]
    );
    if (!result.rows) throw new BadRequestError("Can't retrieve exercises");
    return result.rows;
  }

  /** Refreshes exercise table (MAKES AN API CALL).
   *
   * Returns [{ name, target, secondary[], gif, instructions[], ...}]
   *
   * Throws BadRequestError if unsuccessful.
   **/
  static async refreshData() {
    try {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        params: { limit: "2000" },
        headers: {
          "X-RapidAPI-Key":
            "f5c918036amsh37ee9beb63bb742p1a96eejsn9fa4915133d9",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);

      const exercises = response.data;

      // Log the received data from the external API
      console.log("Received data:", exercises);

      // Truncate the exercises table
      await db.query("DELETE FROM exercises");

      // Insert exercises into the table
      for (const exercise of exercises) {
        await db.query(
          `INSERT INTO exercises (name, target, secondary, gif, instructions)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            exercise.name,
            exercise.target,
            exercise.secondaryMuscles,
            exercise.gifUrl,
            exercise.instructions,
          ]
        );
      }
      return exercises;
    } catch (e) {
      console.error("Error refreshing exercise table:", e);
      throw new BadRequestError("Can't refresh exercise table: " + e.message);
    }
  }
}

module.exports = Exercise;
