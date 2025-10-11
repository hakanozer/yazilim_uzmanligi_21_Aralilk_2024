import express from 'express';
import { checkRole, verifyToken, AuthRequest } from '../configs/auth';
import { eRoles } from '../utils/eRoles';
import { 
    createComment, 
    updateComment, 
    approveComment, 
    getComments, 
    getUserComments, 
    getPendingComments,
    searchComments 
} from '../services/commentService';
import { JwtPayload } from 'jsonwebtoken';

const commentRestController = express.Router();

// Yorum oluşturma - JWT gerekli, User rolü
commentRestController.post('/create', verifyToken, checkRole(eRoles.User), async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const commentData = req.body;
    
    const result = await createComment(commentData, user.id, user.email);
    res.status(result.code).json(result);
});

// Yorum güncelleme - JWT gerekli, User veya Customer rolü
commentRestController.put('/update/:id', verifyToken, async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const commentId = req.params.id;
    const updateData = req.body;
    
    const result = await updateComment(commentId, updateData, user.id, user.roles);
    res.status(result.code).json(result);
});

// Yorum onaylama - JWT gerekli, Admin rolü
commentRestController.patch('/approve/:id', verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const commentId = req.params.id;
    const { isApproved } = req.body;
    
    const result = await approveComment(commentId, isApproved);
    res.status(result.code).json(result);
});

// Tüm yorumları listeleme - JWT gerekli
commentRestController.get('/list', verifyToken, async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getComments(page, limit);
    res.status(result.code).json(result);
});

// Kullanıcıya özel yorumlar - JWT gerekli
commentRestController.get('/my-comments', verifyToken, async (req: AuthRequest, res) => {
    const user = req.user as JwtPayload;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getUserComments(user.id, page, limit);
    res.status(result.code).json(result);
});

// Onay bekleyen yorumlar - JWT gerekli, Admin rolü
commentRestController.get('/pending', verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getPendingComments(page, limit);
    res.status(result.code).json(result);
});

// Yorum arama - JWT gerekli
commentRestController.get('/search', verifyToken, async (req: AuthRequest, res) => {
    const searchTerm = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    if (!searchTerm) {
        return res.status(400).json({
            code: 400,
            status: false,
            message: 'Arama terimi gerekli',
            data: null
        });
    }
    
    const result = await searchComments(searchTerm, page, limit);
    res.status(result.code).json(result);
});

// Belirli bir kullanıcının yorumları - JWT gerekli, Admin veya Customer rolü
commentRestController.get('/user/:userId', verifyToken, checkRole(eRoles.Customer), async (req: AuthRequest, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getUserComments(userId, page, limit);
    res.status(result.code).json(result);
});

export default commentRestController;