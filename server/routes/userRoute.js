import express from "express";
import { deleteUser, getAllUsers, login, logout, signup } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

userRouter.get('/getall', getAllUsers);
userRouter.delete('/delete/:id', deleteUser);


export default userRouter;