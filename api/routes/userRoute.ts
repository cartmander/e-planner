import express from "express";
import { createUser, deleteUser, readAllUsers, readUser, updateUser } from "../controllers/userController.js";
import { validateUpsertUser, validateFindAllUsers, validateFindUserById } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/", validateUpsertUser, createUser);

router.get("/", validateFindAllUsers, readAllUsers);

router.get("/:id", validateFindUserById, readUser);

router.delete("/:id", validateFindUserById, deleteUser);

router.patch("/:id", validateUpsertUser, updateUser);

export default router;