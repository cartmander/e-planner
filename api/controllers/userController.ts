import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

let users: any[] = [];

export const createUser = (req: Request, res: Response) => {
    const user = req.body;

    const userId = uuidv4();
    const userWithId = { ... user, id: userId }

    users.push(userWithId);
    res.send(`User with the name ${user.firstName} has been added to the database.`);
}

export const readAllUsers = (req: Request, res: Response) => {
    res.send(users);
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