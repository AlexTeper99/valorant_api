import express from "express";
import { Character } from "../models";
import { handleErrors } from "../middlewares";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.status(200).send("Buenisimo, entraste a la api de characters");

  Character.find({}).then((character) => {
    res.json(character);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Character.findById(id)
    .then((character) => {
      if (character) return res.json(character);
      else return res.status(404).end();
    })
    .catch(next);
});

router.use(handleErrors);

export default router;
