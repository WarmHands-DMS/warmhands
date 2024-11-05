import express from 'express';
import { getEmails, addEmail } from '../controllers/email.controller.js';
import { verifyAdminToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getEmails);
router.post('/add/', verifyAdminToken, addEmail);

export default router;