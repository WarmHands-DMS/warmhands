import express from 'express';
import { logout, register, signin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/logout", logout);

export default router;