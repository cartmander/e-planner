import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

const userValidationRules: ValidationChain[] = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("birthday").isISO8601().toDate().withMessage("Valid birthday is required"),
    body("occupation").notEmpty().withMessage("Occupation is required")
];

const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}

export const validateUser = [...userValidationRules, handleValidationErrors];