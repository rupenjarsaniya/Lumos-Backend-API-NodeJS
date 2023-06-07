import { Schema, model } from "mongoose";
import { schema_name } from "./schemaName";
import { PostSchemaEntity } from "../type/PostSchemaEntity";

const postSchema = new Schema<PostSchemaEntity>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user_schema",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<PostSchemaEntity>(schema_name.Post, postSchema);
