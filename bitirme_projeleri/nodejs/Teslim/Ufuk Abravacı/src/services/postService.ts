import User from '../models/User';
import Post, { IPost } from '../models/Post';
import { Types } from 'mongoose';

export class PostService {
  async createPost(postData: any): Promise<IPost> {
    // Tags string'ini array'e çevir
    if (postData.tags && typeof postData.tags === 'string') {
      postData.tags = postData.tags.split(',').map((tag: string) => tag.trim());
    }
    
    const post = new Post(postData);
    return await post.save();
  }

  async getPosts(): Promise<IPost[]> {
    return await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
  }

  async getPostById(id: string): Promise<IPost> {
    const post = await Post.findById(id)
      .populate('author', 'name email');
    
    if (!post) {
      throw new Error('Post not found');
    }
    
    return post;
  }

  async getPostsByUser(userId: string): Promise<IPost[]> {
    return await Post.find({ author: userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
  }

  async updatePost(id: string, userId: Types.ObjectId | string, updateData: any): Promise<IPost> {
    const post = await Post.findById(id);
    
    if (!post) {
      throw new Error('Post not found');
    }

    // Tags string'ini array'e çevir
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((tag: string) => tag.trim());
    }

    const postAuthorId = post.author.toString();
    const userIdStr = userId.toString();

    const userIsAdmin = await this.isAdmin(userIdStr);

    if (postAuthorId !== userIdStr && !userIsAdmin) {
      throw new Error('Not authorized to update this post');
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
    return updatedPost!;
  }

  async deletePost(id: string, userId: Types.ObjectId | string): Promise<void> {
    const post = await Post.findById(id);
    
    if (!post) {
      throw new Error('Post not found');
    }

    const postAuthorId = post.author.toString();
    const userIdStr = userId.toString();

    const userIsAdmin = await this.isAdmin(userIdStr);

    // Yetki kontrolü: Ya post sahibi ya da admin
    if (postAuthorId !== userIdStr && !userIsAdmin) {
      throw new Error('Not authorized to delete this post');
    }

    await Post.findByIdAndDelete(id);
  }

  private async isAdmin(userId: string): Promise<boolean> {
    try {
      const user = await User.findById(userId);
      return user?.role === 'admin';
    } catch (error) {
      console.error('Admin check error:', error);
      return false;
    }
  }

   async getAllPostsForAdmin(): Promise<IPost[]> {
    return await Post.find()
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });
  }
}

export default new PostService();