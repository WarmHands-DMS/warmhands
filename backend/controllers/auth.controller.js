import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

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


export const login = (req, res) => {

}


export const logout = (req, res) => {

}
