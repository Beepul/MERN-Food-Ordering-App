import express from "express";
import MyUserControllers from "../controllers/MyUserController";

const router = express.Router();

router.post('/', MyUserControllers.createCurrentUser)


export default router