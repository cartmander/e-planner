import express from "express";
import { createUser, deleteUser, readAllUsers, readUser, updateUser } from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/", validateUser, createUser);

router.get("/", readAllUsers);

router.get("/:id", readUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

export default router;