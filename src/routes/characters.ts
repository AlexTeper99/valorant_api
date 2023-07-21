import express from "express";
import { Character } from "../models";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.status(200).send("Buenisimo, entraste a la api de characters");

  Character.find({}).then((character) => {
    res.json(character);
  });
});

export default router;
