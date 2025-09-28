import express from 'express'
import { checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/eRoles';

const categoryRestController = express.Router()

// category add - jwt, role=admin
categoryRestController.get('/add', verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  res.status(200).json('Category added');
});

// category list - jwt, role=admin, user
categoryRestController.get('/list', verifyToken, checkRole(eRoles.Customer), async (req, res) => {
  res.status(200).json('Category list');
});


export default categoryRestController