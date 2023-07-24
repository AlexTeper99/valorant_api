export interface ISkill {
  key: string;
  name: string;
  description: string;
  icon?: string;
  video?: string;
}

//Document definition
export interface ICharacter {
  name: string;
  rol: string;
  bio: string;
  skills: ISkill[];
  image?: string;
}

export enum Rol {
  Initiator = "Initiator",
  Sentinel = "Sentinel",
  Duelist = "Duelist",
  Controller = "Controller",
}

//TODO: Revisar para que servia esto
export type NewCharacterEntry = Omit<ICharacter, "id">;
