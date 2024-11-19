import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Encrypt password
        const salt = await bcrypt.genSalt();
        //const passwordHash = await bcrypt.hash(password, salt);

        const existingUser = await User.findOne({ username: username });
        if(existingUser) {
            return res.status(400).json({ message: "Username already exists." })
        }

        const user = new User({
            username, password
        });

        // Register user in db
        const newUser = await user.save();
        // Token
        const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET_TOKEN);
        res.status(201).json({ user: newUser, token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Log in
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "User does not exist." })
        }

        // For users that were added to database
        const match = password === user.password;
        
        if (!match) {
            return res.status(400).json({ message: "Credentials are invalid." })
        }

        // Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_TOKEN);

        // Remove password
        delete user.password;
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}