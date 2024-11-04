import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Failed to get users."})
    }
}


export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: {id: id},
        });
        res.status(200).json(user);
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Failed to get user."})
    }
}


export const updateUsers = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body;
    

    

    if (id !== tokenUserId) {
        return res.status(403).json({message: "Not Authorized."})
    }

    let updatedPassword = null;

    

    try {

        if (password) {
          updatedPassword = await bcrypt.hash(password, 10);
        }

       const updatedUser = await prisma.user.update({
        where: {id: id},
        data: {
            ...inputs,
            ...(updatedPassword && {password: updatedPassword}),
            ...(avatar && {avatar})
        }
       })

       const {password: userPassword, ...rest} = updatedUser;

       res.status(200).json(rest);
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Failed to update user."})
    }
}


export const changeUserPassword = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { currentPassword, newPassword } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: 'Current password is incorrect.' });
    }

    // Hash new password
    const updatedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { password: updatedPassword },
    });
    const { password: userPassword, ...rest } = updatedUser;
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to change password.' });
  }
};



export const deleteUsers = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized.' });
  }

  try {
    await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json({ message: 'User deleted.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
};


export const deleteUsersByAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete incidents for this user with "Rejected" or "Pending" status
    await prisma.incident.deleteMany({
      where: {
        userId: id,
        isApproved: { in: ['rejected', 'pending'] },
      },
    });

    // Delete the user after removing unapproved incidents
    await prisma.user.delete({
      where: { id: id },
    });

    res.status(200).json({ message: 'User and related incidents deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
};


export const countUsersByCity = async (req, res) => {
  const city = req.params.city.toLowerCase(); // Convert to lower case

  try {
    const userCount = await prisma.user.count({
      where: {
        // Adjusting the query for case-insensitive matching
        city: {
          equals: city,
          mode: 'insensitive', // This makes the query case insensitive
        },
      },
    });
    res.status(200).json({ userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to count users.' });
  }
};


// Set up transporter with your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false, // Ignore unauthorized certificate
  },
});

// Send email to users in the specified city
export const sendEmails = async (req, res) => {
  const { subject, message } = req.body;
  const { city } = req.params;
   const id = req.params.id;
   const tokenAdminId = req.adminId;
   console.log(id)

   if (id !== tokenAdminId) {
     return res.status(403).json({ message: 'Not Authorized.' });
   }

  try {
    // Fetch all users in the specified city
    const users = await prisma.user.findMany({
      where: { city: city },
      select: { email: true },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found in the specified city.' });
    }

    // Extract emails
    const recipientEmails = users.map(user => user.email);

    // Send email to all users
    const mailOptions = {
      from: 'alert.warmhands@gmail.com',
      to: recipientEmails,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send emails.' });
      }
      res.status(200).json({ message: 'Emails sent successfully', info });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending emails.' });
  }
};