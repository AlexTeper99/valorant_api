import { ICharacter, ISkill, Rol } from "../types";

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

// const parseString = (stringParam: string, messageError: string): string => {
//   if (!isString(stringParam)) {
//     throw new Error(messageError);
//   }

//   return stringParam;
// };

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

export const toNewCharacter = (object: any): ICharacter => {
  let newCharacter: ICharacter = {
    bio: parseBio(object.bio),
    name: parseName(object.name),
    rol: parseRol(object.rol),
    skills: parseSkills(object.skills),
  };

  //WHY THIS ISNT WORKING?
  if (addConditionalAttribute(object.background, "string")) {
    newCharacter.background = object.background;
    console.log(newCharacter.background);
  }

  if (addConditionalAttribute(object.iconRol, "string")) {
    newCharacter.iconRol = object.iconRol;
  }

  if (addConditionalAttribute(object.image, "string")) {
    newCharacter.image = object.image;
  }

  return newCharacter;
};
