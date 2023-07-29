import axios from "axios";
import { Character } from "../models";
import { ISkill, NewCharacterEntry } from "../types";
import { toNewCharacter } from "../utils";
import router from "./characters";

//NOTE: ENDPOINTS THAT I CREATE FOR LEARNING PROPOSES BUT I DONT WANT IT (and because i didnt want to add character one by one in DB)
//THIS IS LIKE AN EASTER EGG :P

//POST ONE NEW CHARACTER
router.post("/", async (req, res, next) => {
  try {
    const auxCharacter = toNewCharacter(req.body); //validation

    const newCharacter = new Character({
      name: auxCharacter.name,
      rol: auxCharacter.rol,
      bio: auxCharacter.bio,
      image: auxCharacter.image,
      background: auxCharacter.background,
      displayIcon: auxCharacter.displayIcon,
      backgroundGradientColors: auxCharacter.backgroundGradientColors,
      skills: auxCharacter.skills,
    });

    const characterAlredyExist = await Character.findOne({
      name: newCharacter.name,
    });

    if (characterAlredyExist) {
      return res.status(409).send("Character alredy exist");
    }

    newCharacter.save().then((savedCharacter) => {
      res.json(savedCharacter);
    });
  } catch (err) {
    next(err);
  }
});

router.post("/post/agents", async (_req, res, next) => {
  try {
    const apiUrl =
      "https://valorant-api.com/v1/agents?isPlayableCharacter=true";
    const response = await axios.get(apiUrl);

    const characters = response.data.data;

    characters.map(async (character: any) => {
      let makeSkillsFormat: ISkill[] = [];

      await character?.abilities.forEach((ability: any) => {
        makeSkillsFormat.push({
          key: ability.slot,
          description: ability.description,
          name: ability.displayName,
          icon: ability.displayIcon,
        });
      });

      const passCharacter: NewCharacterEntry = {
        name: character.displayName,
        bio: character.description,
        rol: character.role.displayName,
        image: character.fullPortrait,
        background: character.background,
        displayIcon: character.displayIcon,
        backgroundGradientColors: character.backgroundGradientColors,
        skills: makeSkillsFormat,
      };

      const auxCharacter = toNewCharacter(passCharacter); //validation
      const newCharacter = new Character({
        name: auxCharacter.name,
        rol: auxCharacter.rol,
        bio: auxCharacter.bio,
        image: auxCharacter.image,
        background: auxCharacter.background,
        displayIcon: auxCharacter.displayIcon,
        backgroundGradientColors: auxCharacter.backgroundGradientColors,
        skills: auxCharacter.skills,
      });
      const characterAlredyExist = await Character.findOne({
        name: newCharacter.name,
      });
      if (characterAlredyExist) {
        return res.status(409).send("Character alredy exist");
      }
      newCharacter.save().then(() => {
        // res.json(savedCharacter);

        makeSkillsFormat = [];
      });
    });

    res.send("We add the agents to the database from valorant api");
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/all", async (_req, res, next) => {
  try {
    await Character.deleteMany({});
    res.status(200).send("All characters were deleted from the database");
  } catch (err) {
    next(err);
  }
});
