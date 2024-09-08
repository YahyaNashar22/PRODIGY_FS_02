import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/token.js";

// sign up
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await User.create({ username, password: hash });

        const token = createToken(user);
        const decoded = verifyToken(token);

        res.status(201).cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
        }).json({
            message: "user created successfully",
            payload: decoded
        });

    } catch (error) {
        res.status(500).json({
            message: "problem creating user",
            error: error.message
        })
    }
}

// log in 
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: "username does not exist!" });

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) return res.status(401).json({ message: "incorrect password!" });

        const token = createToken(user);
        const decoded = verifyToken(token);

        res.status(200).cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None"
        }).json({
            message: "logged in successfully",
            payload: decoded
        })

    } catch (error) {
        res.status(500).json({
            message: "problem logging in",
            error: error.message
        })
    }
}

// logout
export const logout = async (req, res) => {
    console.log("cookie cleared");
    Object.keys(req.cookies).forEach(cookieName => {
        // Clear each cookie by setting its value to null and setting an expired date
        res.clearCookie(cookieName);
    });
    return res
        .clearCookie("userToken")
        .status(200)
        .send("successfully logged out");
}

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "users fetched successfully",
            payload: users
        })
    } catch (error) {
        res.status(500).json({
            message: "problem fetching users",
            error: error.message
        })
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'user not found' });
        res.status(200).json({
            message: 'user deleted successfully',
            payload: user
        })
    } catch (error) {
        res.status(500).json({
            message: "problem deleting user",
            error: error.message
        })
    }
}

