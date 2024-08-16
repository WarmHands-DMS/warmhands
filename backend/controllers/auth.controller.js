import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { fname, lname, email, password, address, province, district, city, nic, mobile} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const newUser = await prisma.user.create({
            data: {
                fname,
                lname,
                email,
                password: hashedPassword,
                address,
                province,
                district,
                city,
                nic,
                mobile
            },
        });

        console.log(newUser)
        res.status(201).json({message: "User registered successfully."});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Failed to register user."})
    }
    
}


export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email: email}
        })

        if(!user) return res.status(401).json({ message: 'Invalid credentials.' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Check your password again.' });

        const age = 1000 * 60 * 60 * 24 * 7;

         const { password: userPassword, ...userInfo } = user;

        const token = jwt.sign({
            id:user.id,
            isAdmin: false
            }, 
            process.env.JWT_SECRET_KEY,
            {expiresIn: age}
        )

        res
          .cookie('token', token, {
            httpOnly: true,
            maxAge: age,
            // secure: true
          })
          .status(200)
          .json(userInfo);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to login.' });
    }
}


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout successful."})
}
