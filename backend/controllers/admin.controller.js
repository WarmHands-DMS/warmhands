import prisma from '../lib/prisma.js';

export const getAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        avatar: true,
        department: true,
        nic: true,
        mobile: true,
        isMaster: true,
        createdAt: true,
      },
    });
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get admins.' });
  }
};
