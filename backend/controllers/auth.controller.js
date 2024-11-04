import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { fname, lname, email, password, address, province, district, city, nic, mobile, uploadedAvatar} = req.body;
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
                mobile,
                avatar: uploadedAvatar
            },
        });

        console.log(newUser)
        res.status(201).json({message: "User registered successfully."});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Failed to register user."})
    }
    
}


export const signinUser = async (req, res) => {
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


export const logoutUser = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout successful."})
}


//Admin Side
export const registerAdmin = async (req, res) => {
  const tokenAdminId = req.adminId;

  const {
    fullName,
    username,
    password,
    email,
    nic,
    mobile,
    avatar,
    department,
    isMaster
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if the requesting admin is a master admin
    const requestingAdmin = await prisma.admin.findUnique({
      where: { id: tokenAdminId },
      select: { isMaster: true },
    });

    if (!requestingAdmin.isMaster) {
      return res.status(403).json({
        message: 'You are not authorized to Register Admins.',
      });
    }

    const newAdmin = await prisma.admin.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        email,
        nic,
        mobile,
        avatar,
        department,
        isMaster,
      },
    });

    console.log(newAdmin);
    res.status(201).json({ message: 'Admin registered successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to register Admin.' });
  }
};

export const signinAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });

    if (!admin) return res.status(401).json({ message: 'Invalid credentials.' });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Check your password again.' });

    const age = 1000 * 60 * 60 * 24;

    const { password: adminPassword, ...adminInfo } = admin;

    const token = jwt.sign(
      {
        id: admin.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res
      .cookie('adminToken', token, {
        httpOnly: true,
        maxAge: age,
        // secure: true
      })
      .status(200)
      .json(adminInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to login.' });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie('adminToken').status(200).json({ message: 'Admin Logout successful.' });
};