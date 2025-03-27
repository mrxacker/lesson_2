import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new User
        const insertUser = db.prepare(
            "INSERT INTO users (username, password) VALUES (?, ?)"
        );
        const result = insertUser.run(username, hashedPassword);
        
        // Create first ToDO
        const defaultTodo = "Hello :) This is your first todo!";
        const insertTodo = db.prepare(
            "INSERT INTO todos (user_id, task) VALUES (?, ?)"
        );
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        // Create JWT token for new user
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });


        res.status(201).json({ message: "User registered successfully","token": token });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error registering user" });
    }
}); 




export default router