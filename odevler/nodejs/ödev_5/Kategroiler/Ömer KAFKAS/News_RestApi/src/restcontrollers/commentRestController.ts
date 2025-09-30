import express from 'express'
import { checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/eRoles';

const commentRestController = express.Router()


export default commentRestController