import { Request, Response } from "express";
import { userSchema } from "../model";
import bcrypt from "bcrypt";
import { UserSchemaEntity } from "../type/UserSchemaEntity";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthenticatedRequest } from "../middleware/auth";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: UserSchemaEntity = req.body;

    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email address already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Failed to register user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret as string);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Failed to log in", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userInfo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await userSchema.findById(req.userId).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to fetch user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
