import express from "express";
import { deleteAdmin, getAdmin, getAdmins } from "../controllers/admin.controller.js";
import { verifyAdminToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAdmins);
router.get('/profile/', verifyAdminToken, getAdmin);
router.delete('/delete/:id', verifyAdminToken, deleteAdmin);



export default router;