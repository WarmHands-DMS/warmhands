import prisma from "../lib/prisma.js";

export const getIncidents = async (req, res) => {
    try {
        const incidents = await prisma.incident.findMany();
        res.status(200).json(incidents)
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Failed to get incidents."})
    }
}


export const getIncident = async (req, res) => {
    const id = req.params.id;
    try {
        const incident = await prisma.incident.findUnique({
            where: {id: id},
            include: {
                incidentDetail: true,
                user: {
                    select: {
                        fname: true,
                        lname: true,
                        avatar: true
                    }
                }
            }
        });
        res.status(200).json(incident);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get incident.' });
    }
};


export const addIncident = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    try {
        const newIncident = await prisma.incident.create({
            data: {
                ...body.incidentData,
                userId: tokenUserId,
                incidentDetail: {
                    create: body.incidentDetail,
                }
            }
        });
        console.log("came")
        res.status(200).json(newIncident);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to report incident' });
    }
};


export const updateIncident = async (req, res) => {
  try {
    res.status(200).json({ message: ' ' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete incident' });
  }
};


export const deleteIncident = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const incident = await prisma.incident.findUnique({
            where: {id: id}
        })

        if(incident.userId !== tokenUserId) {
            return res.status(403).json({ message: 'Not Authorized.' });
        }

        await prisma.incident.delete({
            where: {id: id}
        })
        

        res.status(200).json({ message: 'Incident deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete incident' });
    }
};