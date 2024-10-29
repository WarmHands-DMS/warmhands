import express from 'express';
import {
  deleteUsers,
  getUser,
  getUsers,
  updateUsers,
  countUsersByCity,
  sendEmails,
} from '../controllers/user.controller.js';
import {verifyToken, verifyAdminToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUsers);
router.delete('/:id', verifyToken, deleteUsers);

router.get('/count/:city', countUsersByCity);
router.post('/:id/send-emails/:city', verifyAdminToken, sendEmails);

export default router;
