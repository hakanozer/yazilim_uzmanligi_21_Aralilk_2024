import express from "express";
import { INewsModel } from "../models/newsModel";
import { newsAdd } from "../services/newsServices";
import NewsDB from "../models/newsModel";
import UserDB from "../models/userModel";
import { addComment, deleteComment, getNewsById, listComments, updateNews, deleteNews } from "../services/newsServices";

export const newsController = express.Router();


newsController.get('/', (req,res) => {
 res.render ('news')  
})


newsController.post('/newsAdd', async (req,res) => {
    const news : INewsModel = req.body;
    const status = await newsAdd(news, req);
    res.render('news', {status: status});
})


newsController.get('/list', async (req,res) => {
    const user = res.locals.user;
    const { q, owner, from, to } = req.query as { [key: string]: string };

    const filter: any = {};
    if (q) {
        filter.title = { $regex: q, $options: 'i' };
    }
    if (from || to) {
        filter.date = {};
        if (from) filter.date.$gte = new Date(from);
        if (to) filter.date.$lte = new Date(to);
    }

    if (user?.role === 'admin') {
        if (owner) filter.userID = owner;
        const posts = await NewsDB.find(filter).populate('userID', 'surname lastname email').sort({ date: -1 });
        const totalUsers = await UserDB.countDocuments({});
        const totalPosts = await NewsDB.countDocuments({});
        const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
        const postsToday = await NewsDB.countDocuments({ date: { $gte: startOfDay } });
        const users = await UserDB.find({}).sort({ surname: 1, lastname: 1 });
        return res.render('newsList', { posts, user, users, stats: { totalUsers, totalPosts, postsToday }, filters: { q: q || '', owner: owner || '', from: from || '', to: to || '' } });
    } else {
        filter.userID = user?._id;
        const posts = await NewsDB.find(filter).sort({ date: -1 });
        return res.render('newsList', { posts, user, filters: { q: q || '', owner: '', from: from || '', to: to || '' } });
    }
})


newsController.get('/:id', async (req,res) => {
    const post = await getNewsById(req.params.id);
    if (!post) return res.redirect('/news/list');
    const user = res.locals.user;
    const isOwner = post.userID?.toString() === user?._id?.toString();
    const isAdmin = user?.role === 'admin';
    if (!isOwner && !isAdmin) return res.redirect('/news/list');
    const comments = await listComments(req.params.id);
    res.render('newsDetail', { post, comments, user: res.locals.user });
})


newsController.post('/update/:id', async (req,res) => {
    const payload = {
        title: req.body.title,
        detail: req.body.detail,
        date: req.body.date,
        color: req.body.color
    } as Partial<INewsModel>;
    const status = await updateNews(req.params.id, payload, req);
    if (status === true) {
        res.redirect(`/news/${req.params.id}`)
    } else {
        const post = await getNewsById(req.params.id);
        const comments = await listComments(req.params.id);
        res.render('newsDetail', { post, comments, user: res.locals.user, status });
    }
})


newsController.post('/delete/:id', async (req,res) => {
    const status = await deleteNews(req.params.id, req);
    res.redirect('/news/list');
})


newsController.post('/:id/comment', async (req,res) => {
    const status = await addComment(req.params.id, req.body.text, req);
    res.redirect(`/news/${req.params.id}`);
})


newsController.post('/:id/comment/:commentId/delete', async (req,res) => {
    const status = await deleteComment(req.params.id, req.params.commentId, req);
    res.redirect(`/news/${req.params.id}`);
})