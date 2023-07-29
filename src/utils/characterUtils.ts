import { ISkill, NewCharacterEntry, Rol } from "../types";

//validate data types
const isString = (string: string): boolean => {
  return typeof string === "string";
};

function isRol(rol: any): boolean {
  return Object.values(Rol).includes(rol);
}

//parse attrtibutes
function parseBio(bio: any): string {
  if (!isString(bio)) {
    throw new Error("Incorrect or missing bio");
  }

  return bio;
}

function parseName(name: any): string {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
}

function parseRol(rol: any): string {
  if (!isString(rol) || !isRol(rol)) {
    throw new Error("Incorrect or missing Rol");
  }

  return rol;
}

//im tired of individual parses so i create a generical

const parseString = (stringParam: string, messageError: string): string => {
  if (!isString(stringParam)) {
    throw new Error(messageError);
  }

  return stringParam;
};

//----------------------------------------------

function isSkill(object: any): object is ISkill {
  return (
    "key" in object &&
    "name" in object &&
    "description" in object &&
    typeof object.key === "string" &&
    typeof object.name === "string" &&
    typeof object.description === "string" &&
    (typeof object.icon === "undefined" || typeof object.icon === "string") &&
    (typeof object.video === "undefined" || typeof object.video === "string")
  );
}

function addConditionalAttribute(attribute: any, type: any): boolean {
  let aux = typeof attribute !== "undefined" && typeof attribute === type;

  console.log(aux);

  return aux;
}

function parseSkills(skills: any): ISkill[] {
  if (Array.isArray(skills)) {
    let i: number = 0;
    let isSkillFormat = true;

    while (i < skills.length && isSkillFormat) {
      isSkillFormat = isSkill(skills[i]);

      if (!isSkillFormat) {
        throw new Error("Element " + i + " is not Skill Format");
      }

      i++;
    }
  } else {
    throw new Error("Skills must be an array");
  }

  return skills;
}

function isValidHexColor(input: any): boolean {
  if (typeof input === "string") {
    // const regex = /^([0-9a-f]{3}){1,2}$/i;
    // return regex.test(input);
    return true;
  }

  return false;
}

const parseBackgroundGradientColors = (
  backgroundGradientColors: any
): string[] => {
  if (Array.isArray(backgroundGradientColors)) {
    let i: number = 0;
    let isHexColor = true;

    while (i < backgroundGradientColors.length && isHexColor) {
      isHexColor = isValidHexColor(backgroundGradientColors[i]);

      if (!isHexColor) {
        throw new Error("Element " + i + " is not HexColor Format");
      }
      i++;
    }
  } else {
    throw new Error("BackgroundGradientColors must be an array");
  }

  return backgroundGradientColors;
};

export const toNewCharacter = (object: any): NewCharacterEntry => {
  let newCharacter: NewCharacterEntry = {
    bio: parseBio(object.bio),
    name: parseName(object.name),
    rol: parseRol(object.rol),
    skills: parseSkills(object.skills),
    image: parseString(object.image, "Image must be a string"),
    background: parseString(object.background, "Background must be a string"),
    displayIcon: parseString(object.displayIcon, "Image must be a string"),
    backgroundGradientColors: parseBackgroundGradientColors(
      object.backgroundGradientColors
    ),
  };

  //WHY THIS ISNT WORKING?
  if (addConditionalAttribute(object.background, "string")) {
    newCharacter.background = object.background;
    console.log(newCharacter.background);
  }

  if (addConditionalAttribute(object.image, "string")) {
    newCharacter.image = object.image;
  }

  return newCharacter;
};
