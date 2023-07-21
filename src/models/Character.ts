import { Schema, model, Model, Types } from "mongoose";

//subdocument definition
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

//// TMethodsAndOverrides
type CharacterDocumentProps = {
  skills: Types.DocumentArray<ISkill>;
};
type CharacterModelType = Model<ICharacter, {}, CharacterDocumentProps>;

const characterSchema = new Schema<ICharacter, CharacterModelType>({
  name: { type: String, required: true },
  rol: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: false },
  skills: [
    new Schema<ISkill>({
      key: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: false },
      video: { type: String, required: false },
    }),
  ],
});

export const Character = model<ICharacter, CharacterModelType>(
  "Character",
  characterSchema
);
