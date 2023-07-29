import { Types } from "mongoose";

export interface ISkill {
  key: string;
  name: string;
  description: string;
  icon: string;
  video?: string;
}

//Document definition
export interface ICharacter {
  name: string;
  rol: string;
  bio: string;
  image: string;
  background: string;
  displayIcon: string;
  backgroundGradientColors: Types.Array<string>;
  skills: ISkill[];
}

export enum Rol {
  Initiator = "Initiator",
  Sentinel = "Sentinel",
  Duelist = "Duelist",
  Controller = "Controller",
}
export type NewCharacterEntry = Omit<ICharacter, "backgroundGradientColors"> & {
  backgroundGradientColors: string[];
};
