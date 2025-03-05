import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import User, { IUser } from "../models/User.js";

const validateUserBodyRequest: ValidationChain[] = [
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
    body("birthday").isISO8601().toDate().withMessage("Valid birthday is required"),
    body("occupation").trim().notEmpty().withMessage("Occupation is required")
];

const upsertUserValidationRules = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    next();
}

const findAllUsersValidationRules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await User.find() as IUser[];

    if (!users.length) {
        res.status(404).json({ message: "No users found" });
        return;
    }

    (req as any).user = users;
    next();
}

const findUserValidationRules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    
    const user = await User.findOne({ id }) as IUser;

    if (!user) {
        res.status(404).json({ message: `No user with ${id} found` });
        return;
    }

    (req as any).user = user;
    next();
}

export const validateUpsertUser = [...validateUserBodyRequest, upsertUserValidationRules];
export const validateFindAllUsers = [findAllUsersValidationRules];
export const validateFindUserById = [findUserValidationRules];