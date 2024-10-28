import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { getIncidents, getIncident, addIncident, updateIncident, deleteIncident, approveIncident } from "../controllers/incident.controller.js";

const router = express.Router();

router.get("/", getIncidents);
router.get("/:id", getIncident);
router.post("/", verifyToken, addIncident);
router.put("/:id", verifyToken, updateIncident);
router.delete("/:id", verifyToken, deleteIncident);
router.put('/:id/approve', approveIncident);

export default router;