import express from "express";
import { Character } from "../models";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.status(200).send("Buenisimo, entraste a la api de characters");

  Character.find({}).then((character) => {
    res.json(character);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Character.findById(id)
    .then((character) => {
      if (character) return res.json(character);
    })
    .catch((_err) => res.status(500).json({ message: "Server Error" }));
});

export default router;
