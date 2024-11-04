import prisma from '../lib/prisma.js';

export const getEmails = async (req, res) => {
  
  try {
    const emails = await prisma.email.findMany({
      include: {
        sentBy: {
          select: {
            username: true
          },
        },
        
      },
    });
    res.status(200).json(emails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get emails.' });
  }
};

export const addEmail = async (req, res) => {
  const {title, message, userCount, city, incidentId} = req.body;
  const tokenAdminId = req.adminId;
  try {
    const newEmail = await prisma.email.create({
      data: {
        title,
        message, 
        userCount, 
        city, 
        incidentId,
        sentById: tokenAdminId
      },
    });
    console.log('came Email');
    res.status(200).json(newEmail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to add Email' });
  }
};
