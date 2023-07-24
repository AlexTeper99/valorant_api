import { Schema, model, Model, Types } from "mongoose";
import { ICharacter, ISkill } from "../types";

//subdocument definition

//// TMethodsAndOverrides
type CharacterDocumentProps = {
  skills: Types.DocumentArray<ISkill>;
};
type CharacterModelType = Model<ICharacter, {}, CharacterDocumentProps>;

const skillSchema = new Schema<ISkill>({
  key: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: false },
  video: { type: String, required: false },
});

const characterSchema = new Schema<ICharacter, CharacterModelType>({
  name: { type: String, required: true },
  rol: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: false },
  skills: [skillSchema],
});

skillSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//TODO: volver a buscar para que servia esto
characterSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Character = model<ICharacter, CharacterModelType>(
  "Character",
  characterSchema
);
