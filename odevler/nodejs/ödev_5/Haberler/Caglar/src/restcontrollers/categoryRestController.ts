import express from 'express'
import { checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/enumRole';


const categoryRestController = express.Router()

// category add jwt-role=admin
// verifyToken, tokeni kontrol eder
// checkRole, role kontrolü yapar
categoryRestController.get('/add', verifyToken, checkRole(eRoles.admin), async (req,res) => {
    res.status(200).json('Category added successfully')
});

// category list jwt-role = admin,user
categoryRestController.get('/list', verifyToken, async(req,res) => {
    res.status(200).json('Category list');
});

export default categoryRestController