import { Request, Response } from "express";
import { postSchema } from "../model";
import { AuthenticatedRequest } from "../middleware/auth";

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, content } = req.body;

    if (req.file) {
      const post = new postSchema({
        title,
        content,
        imageUrl: req.file.filename,
        userId: req.userId,
      });

      await post.save();

      res.status(201).json({ message: "Post created successfully" });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Failed to create post", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postSchema.find();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Failed to fetch all post", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const posts = await postSchema.find({ userId: req.userId });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Failed to fetch all post", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
