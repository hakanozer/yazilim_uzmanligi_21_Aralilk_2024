import { Article, IArticle } from '../models/Article';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface UpdateArticleData {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  isPublished?: boolean;
}

export interface ArticleFilters {
  category?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  isPublished?: boolean;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
}

export class ArticleService {
  static async createArticle(data: CreateArticleData): Promise<IArticle> {
    try {
      // Verify category exists
      const category = await Category.findById(data.category);
      if (!category) {
        throw new AppError('Category not found', 404);
      }

      // Verify author exists
      const author = await User.findById(data.author);
      if (!author) {
        throw new AppError('Author not found', 404);
      }

      const article = new Article(data);
      await article.save();

      return article.populate([
        { path: 'author', select: 'firstName lastName profilePicture' },
        { path: 'category', select: 'name color' }
      ]);
    } catch (error: any) {
      logger.error('Failed to create article', error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message).join(', ');
        throw new AppError(`Validation failed: ${messages}`, 400);
      }
      
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to create article', 500);
    }
  }

  static async getArticleById(id: string): Promise<IArticle> {
    try {
      logger.database('findById', 'articles', { id });
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid article ID', 400);
      }

      const article = await Article.findById(id)
        .populate('author', 'firstName lastName profilePicture')
        .populate('category', 'name color')
        .populate('comments', 'content author createdAt')
        .populate('likes', 'firstName lastName')
        .populate('dislikes', 'firstName lastName');

      if (!article) {
        logger.warn('Article not found', { id });
        throw new AppError('Article not found', 404);
      }

      // Increment view count
      article.views += 1;
      await article.save();

      logger.database('update', 'articles', { id, views: article.views });
      return article;
    } catch (error) {
      logger.error('Failed to get article', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to get article', 500);
    }
  }

  static async getArticles(
    filters: ArticleFilters = {},
    pagination: PaginationOptions = { page: 1, limit: 10 }
  ): Promise<{ articles: IArticle[]; total: number; pages: number }> {
    try {
      const query: any = {};

      // Apply filters
      if (filters.category) {
        query.category = new mongoose.Types.ObjectId(filters.category);
      }
      if (filters.author) {
        query.author = new mongoose.Types.ObjectId(filters.author);
      }
      if (filters.tags && filters.tags.length > 0) {
        query.tags = { $in: filters.tags };
      }
      if (filters.featured !== undefined) {
        query.featured = filters.featured;
      }
      if (filters.isPublished !== undefined) {
        query.isPublished = filters.isPublished;
      }
      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { content: { $regex: filters.search, $options: 'i' } },
          { excerpt: { $regex: filters.search, $options: 'i' } }
        ];
      }

      const skip = (pagination.page - 1) * pagination.limit;
      const sort = pagination.sort || '-createdAt';

      const [articles, total] = await Promise.all([
        Article.find(query)
          .populate('author', 'firstName lastName profilePicture')
          .populate('category', 'name color')
          .sort(sort)
          .skip(skip)
          .limit(pagination.limit),
        Article.countDocuments(query)
      ]);

      const pages = Math.ceil(total / pagination.limit);

      return { articles, total, pages };
    } catch (error) {
      throw new AppError('Failed to get articles', 500);
    }
  }

  static async updateArticle(id: string, data: UpdateArticleData, userId: string): Promise<IArticle> {
    try {
      const article = await Article.findById(id);
      if (!article) {
        throw new AppError('Article not found', 404);
      }

      // Check if user is author or admin
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const isAuthor = article.author.toString() === userId;
      const isAdmin = user.roles.includes('admin');

      if (!isAuthor && !isAdmin) {
        throw new AppError('Not authorized to update this article', 403);
      }

      // If category is being updated, verify it exists
      if (data.category) {
        const category = await Category.findById(data.category);
        if (!category) {
          throw new AppError('Category not found', 404);
        }
      }

      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      ).populate([
        { path: 'author', select: 'firstName lastName profilePicture' },
        { path: 'category', select: 'name color' }
      ]);

      return updatedArticle!;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update article', 500);
    }
  }

  static async deleteArticle(id: string, userId: string): Promise<void> {
    try {
      const article = await Article.findById(id);
      if (!article) {
        throw new AppError('Article not found', 404);
      }

      // Check if user is author or admin
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const isAuthor = article.author.toString() === userId;
      const isAdmin = user.roles.includes('admin');

      if (!isAuthor && !isAdmin) {
        throw new AppError('Not authorized to delete this article', 403);
      }

      await Article.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to delete article', 500);
    }
  }

  static async likeArticle(articleId: string, userId: string): Promise<IArticle> {
    try {
      const article = await Article.findById(articleId);
      if (!article) {
        throw new AppError('Article not found', 404);
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);

      // Remove from dislikes if present
      article.dislikes = article.dislikes.filter(id => !id.equals(userObjectId));

      // Add to likes if not already present
      if (!article.likes.some(id => id.equals(userObjectId))) {
        article.likes.push(userObjectId);
      } else {
        // Remove from likes if already present
        article.likes = article.likes.filter(id => !id.equals(userObjectId));
      }

      await article.save();
      return article;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to like article', 500);
    }
  }

  static async dislikeArticle(articleId: string, userId: string): Promise<IArticle> {
    try {
      const article = await Article.findById(articleId);
      if (!article) {
        throw new AppError('Article not found', 404);
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);

      // Remove from likes if present
      article.likes = article.likes.filter(id => !id.equals(userObjectId));

      // Add to dislikes if not already present
      if (!article.dislikes.some(id => id.equals(userObjectId))) {
        article.dislikes.push(userObjectId);
      } else {
        // Remove from dislikes if already present
        article.dislikes = article.dislikes.filter(id => !id.equals(userObjectId));
      }

      await article.save();
      return article;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to dislike article', 500);
    }
  }

  static async getFeaturedArticles(limit: number = 5): Promise<IArticle[]> {
    try {
      return await Article.find({ featured: true, isPublished: true })
        .populate('author', 'firstName lastName profilePicture')
        .populate('category', 'name color')
        .sort('-createdAt')
        .limit(limit);
    } catch (error) {
      throw new AppError('Failed to get featured articles', 500);
    }
  }

  static async getPopularArticles(limit: number = 5): Promise<IArticle[]> {
    try {
      return await Article.find({ isPublished: true })
        .populate('author', 'firstName lastName profilePicture')
        .populate('category', 'name color')
        .sort('-views')
        .limit(limit);
    } catch (error) {
      throw new AppError('Failed to get popular articles', 500);
    }
  }
}
