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

const parseString = (stringParam: string, messageError: string): string => {
  if (!isString(stringParam)) {
    throw new Error(messageError);
  }

  return stringParam;
};

//----------------------------------------------

function parseSkills(skills: any): ISkill[] {
  //TODO: add logic

  return skills;
}

export const toNewCharacter = (object: any): ICharacter => {
  const newCharacter: ICharacter = {
    bio: parseBio(object.bio),
    name: parseName(object.name),
    rol: parseRol(object.rol),
    skills: parseSkills(object.skills),
    image: parseString(object.image, "Incorrect or missing image"),
  };

  return newCharacter;
};
