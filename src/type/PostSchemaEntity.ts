import { Schema } from "mongoose";

export interface PostSchemaEntity {
  title: string;
  content: string;
  imageUrl: string;
  userId: Schema.Types.ObjectId;
}
