import express from 'express'
import { checkRole, verifyToken } from '../configs/auth';

const categoryRestController = express.Router()

// category add - jwt, role=admin
categoryRestController.get('/add', verifyToken, checkRole('admin'), async (req, res) => {
  res.status(200).json('Category added');
});

// category list - jwt, role=admin, user
categoryRestController.get('/list', verifyToken, async (req, res) => {
  res.status(200).json('Category list');
});


export default categoryRestController