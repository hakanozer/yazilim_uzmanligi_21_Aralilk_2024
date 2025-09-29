import express from 'express'
import { AuthRequest, checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/eRoles';
import {  createComment, 
    updateComment, 
    approveComment, 
    getComments, 
    getUserComments, 
    getPendingComments,
    searchComments  } from '../services/commentService';
import { JwtPayload } from 'jsonwebtoken';

const commentRestController = express.Router()

// Yorum oluşturma -jwt, kullanıcı kontrolü
commentRestController.post('/create', verifyToken, checkRole(eRoles.User), async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const commentData = req.body;
    const result = await createComment(commentData, user.id, user.email);
    res.status(result.code).json(result);
});

// Yorum güncelleme, kullanıcı ve commentId kontrolü
commentRestController.put('/update/:id', verifyToken, async (req: AuthRequest,res) =>{
    const user = req.user as JwtPayload;
    const commentId = req.params.id;
    const updateData = req.body;
    const result = await updateComment(commentId, updateData, user.id, user.roles);
    res.status(result.code).json(result);
});