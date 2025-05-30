import User from "../models/user.model";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(password < 6) {
            return res.status(400).json({message: "Password must be at least 6 charrecters"});
        }
        
        const user = await User.findOne({email})
        if (user) return res.status(400).json({message: "User with this email already exist."})
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            fullName,
            email,
            password: hashedPassword,
        })

        if(newUser) {

        } else {
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
        
    }
};

export const login = (req, res) => {
    res.send("Login route")
};

export const logout = (req, res) => {
    res.send("Logout route")
};
