const Exercise = require("../models/exercise");

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");

const router = express.Router();

/** GET / { exercises }  => [{ name, target, secondary, gif, instructions}, ...]
 *
 * Returns all exercises
 *
 **/
router.get("/", async function(req, res, next){
    try{
        const exercises = await Exercise.getAll();
        return res.status(201).json({exercises});
    } catch(e){
        return next(e);
    }
})

/** GET / { exercise }  => { name, target, secondary, gif, instructions}
 *
 * Returns chosen exercise
 *
 **/
router.get("/:exercise", async function(req, res, next){
    try{
        const exercise = await Exercise.get(req.params.exercise);
        return res.json({exercise})
    } catch(e){
        return next(e)
    }
})

/** POST / { exercises }  => [{ name, target, secondary, gif, instructions}, ...]
 *
 * Returns updated exercises data
 *
 **/
router.post("/refresh", async function(req, res, next){
    try{
        const updatedExercises = await Exercise.refreshData();
        return res.status(201).json({ exercises: updatedExercises });
    } catch(e){
        return next(e);
    }
})

module.exports = router;