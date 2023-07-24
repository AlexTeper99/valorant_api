import express from "express";
import { Character } from "../models";
import { handleErrors } from "../middlewares";
import { toNewCharacter } from "../utils";

const router = express.Router();

//GET ALL CHARACTERS
router.get("/", (_req, res) => {
  // res.status(200).send("Buenisimo, entraste a la api de characters");

  Character.find({}).then((character) => {
    res.json(character);
  });
});

//GET ONE CHARACTER BY ID
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Character.findById(id)
    .then((character) => {
      if (character) return res.json(character);
      else return res.status(404).end();
    })
    .catch(next);
});

//POST ONE NEW CHARACTER
router.post("/", (req, res, next) => {
  try {
    const auxCharacter = toNewCharacter(req.body); //validation

    const newCharacter = new Character({
      bio: auxCharacter.bio,
      name: auxCharacter.name,
      rol: auxCharacter.rol,
      skills: auxCharacter.skills,
      image: auxCharacter.image,
    });

    newCharacter.save().then((savedCharacter) => {
      res.json(savedCharacter);
    });
  } catch (err) {
    next(err);
  }
});

router.use(handleErrors);

export default router;
