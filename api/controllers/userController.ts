import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";

let users: any[] = [];

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({ message: `User ${newUser.firstName} added successfully`, user: newUser });
    } 
    
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}

export const readAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
}

export const readUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === id);

    res.send(`User is: ${foundUser?.firstName}`);
}

export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id == id);

    if (firstName !== undefined) user!.firstName = firstName;
    if (lastName !== undefined) user!.lastName = lastName;
    if (age !== undefined) user!.age = age;

    res.send(`User with the id ${id} has been updated to the database.`);
}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    users = users.filter(user => user.id != id);
    res.send(`User with the id ${id} has been deleted from the database.`);
}