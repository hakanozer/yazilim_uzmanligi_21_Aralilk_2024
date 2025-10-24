import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { asyncHandler } from '../../middlewares/errorMiddleware';
import postService from '../../services/postService';

export const createPost = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not authenticated'
    });
  }

  const postData = {
    ...req.body,
    author: req.user._id // ✅ Artık ObjectId olarak gönderiyoruz
  };

  const post = await postService.createPost(postData);

  res.status(201).json({
    status: 'success',
    data: { post }
  });
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  
  res.json({
    status: 'success',
    data: { posts }
  });
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.getPostById(req.params.id);
  
  res.json({
    status: 'success',
    data: { post }
  });
});

export const updatePost = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not authenticated'
    });
  }

  const post = await postService.updatePost(req.params.id, req.user._id, req.body);
  
  res.json({
    status: 'success',
    data: { post }
  });
});

export const deletePost = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not authenticated'
    });
  }

  await postService.deletePost(req.params.id, req.user._id);
  
  res.json({
    status: 'success',
    message: 'Post deleted successfully'
  });
});

export const editPostPage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    const post = await postService.getPostById(req.params.id);
    
    // Yetki kontrolü: Ya post sahibi ya da admin
    const isOwner = req.session.user.id === post.author._id.toString();
    const isAdmin = req.session.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).render('error', {
        title: 'Yetkisiz Erişim',
        message: 'Bu postu düzenleme yetkiniz yok.'
      });
    }

    res.render('posts/edit', {
      title: 'Yazıyı Düzenle',
      post,
      user: req.session.user,
      error: null
    });
  } catch (error: any) {
    res.status(404).render('error', {
      title: 'Post Bulunamadı',
      message: error.message
    });
  }
});

export const updatePostHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    await postService.updatePost(req.params.id, req.session.user.id, req.body);
    res.redirect(`/posts/${req.params.id}`);
  } catch (error: any) {
    // Hata durumunda edit sayfasını tekrar göster
    const post = await postService.getPostById(req.params.id);
    res.render('posts/edit', {
      title: 'Yazıyı Düzenle',
      post,
      user: req.session.user,
      error: error.message
    });
  }
});

