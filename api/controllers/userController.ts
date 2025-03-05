import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({ message: `User ${newUser.firstName} added successfully`, newUser });
    } 
    
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}

export const readAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find() as IUser[];
        res.status(200).json({ message: `Users listed successfully`, users});
    } 
    
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
}

export const readUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ id }) as IUser;
        res.status(200).json({ message: `User ${user.id} listed successfully`, user});
    } 
    
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { id },
            { $set: req.body },
            { new: true }
        ) as IUser;
        
        res.status(200).json({ message: `User ${updatedUser.id} updated successfully`, updatedUser });
    } 

    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete(
            { id },
            { $set: req.body }
        ) as IUser;

        res.status(200).json({ message: `User ${deletedUser.id} updated successfully`, deletedUser });
    }

    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}