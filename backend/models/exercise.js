const db = require("../db");
const { NotFoundError } = require("../expressError");

class Exercise {
  /** Given a exercise name, return data about exercise.
   *
   * Returns { name, target, secondary[], gif, instructions[] }
   *
   **/
  static async get(name) {
    const result = await db.query(
      `SELECT name,
                  target,
                  secondary,
                  gif,
                  instructions
           FROM exercises
           WHERE name = $1`,
      [name]
    );

    const exercise = result.rows[0];

    if (!exercise) throw new NotFoundError(`No exercise: ${name}`);

    return exercise;
  }

  /** Returns all exercises.
   *
   * Returns { name, target, secondary[], gif, instructions[] }
   *
   * Throws NotFoundError if user not found.
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
    return result.rows;
  }
}

module.exports = Exercise;
