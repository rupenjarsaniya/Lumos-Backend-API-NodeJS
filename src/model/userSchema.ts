import { Schema, model } from "mongoose";
import { schema_name } from "./schemaName";
import { UserSchemaEntity } from "../type/UserSchemaEntity";

const userSchema = new Schema<UserSchemaEntity>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<UserSchemaEntity>(schema_name.User, userSchema);
