import { Request, Response } from 'express';
import { asyncHandler } from '../../middlewares/errorMiddleware';
import postService from '../../services/postService';

// ✅ WEB CONTROLLER'LARI (EJS için)

// Sayfalar
export const postsPage = asyncHandler(async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  
  res.render('posts/index', {
    title: 'All Posts',
    posts,
    user: req.session.user
  });
});

export const createPostPage = asyncHandler(async (req: Request, res: Response) => {
  res.render('posts/create', {
    title: 'Create Post',
    user: req.session.user,
    error: null
  });
});

export const postDetailPage = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.getPostById(req.params.id);
  
  res.render('posts/detail', {
    title: post.title,
    post,
    user: req.session.user
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

// Form İşlemleri
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    const postData = {
      ...req.body,
      author: req.session.user.id
    };

    await postService.createPost(postData);
    res.redirect('/posts');
  } catch (error: any) {
    res.render('posts/create', {
      title: 'Create Post',
      user: req.session.user,
      error: error.message
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
    const post = await postService.getPostById(req.params.id);
    res.render('posts/edit', {
      title: 'Yazıyı Düzenle',
      post,
      user: req.session.user,
      error: error.message
    });
  }
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    await postService.deletePost(req.params.id, req.session.user.id);
    res.redirect('/posts');
  } catch (error: any) {
    const post = await postService.getPostById(req.params.id);
    res.render('posts/detail', {
      title: post.title,
      post,
      user: req.session.user,
      error: error.message
    });
  }
});

export const dashboardPage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  const allPosts = await postService.getPosts();
  const userPosts = allPosts.filter(post => 
    post.author._id.toString() === req.session.user?.id
  );

  res.render('dashboard', {
    title: 'Dashboard',
    user: req.session.user,
    userPosts
  });
});