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


export const getAdmin = async (req, res) => {
  const id = req.adminId;
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: id },
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
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get Admin.' });
  }
};


export const deleteAdmin = async (req, res) => {
  const id = req.params.id; // ID of the admin to be deleted
  const tokenAdminId = req.adminId; // ID of the admin making the request

  if (id === tokenAdminId) {
    return res.status(403).json({ message: 'You are not authorized to delete yourself.' });
  }

  try {
    // Check if the requesting admin is a master admin
    const requestingAdmin = await prisma.admin.findUnique({
      where: { id: tokenAdminId },
      select: { isMaster: true },
    });

    if (!requestingAdmin.isMaster) {
      return res
        .status(403)
        .json({
          message:
            'You are not authorized to delete Admins.',
        });
    }

    // Proceed with deletion if master
    await prisma.admin.delete({
      where: { id: id },
    });

    res.status(200).json({ message: 'Admin deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete admin.' });
  }
};
