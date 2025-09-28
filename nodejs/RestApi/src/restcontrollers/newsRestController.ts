import express from 'express'
import { checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/eRoles';

const newsRestController = express.Router()


export default newsRestController