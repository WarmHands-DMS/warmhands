import express from "express";
import {verifyAdminToken, verifyToken} from "../middleware/verifyToken.js";
import { getIncidents, getIncident, addIncident, updateIncident, deleteIncident, approveIncident, deleteIncidentByAdmin, rejectIncident, updateIncidentMailSent } from "../controllers/incident.controller.js";

const router = express.Router();

router.get("/", getIncidents);
router.get("/:id", getIncident);
router.post("/", verifyToken, addIncident);
router.put("/:id", verifyToken, updateIncident);
router.delete("/user/:id", verifyToken, deleteIncident);

router.put('/:id/approve', approveIncident);
router.put('/:id/reject', rejectIncident);
router.put('/:id/email-sent', updateIncidentMailSent);
router.delete("/admin/:id", deleteIncidentByAdmin);

export default router;