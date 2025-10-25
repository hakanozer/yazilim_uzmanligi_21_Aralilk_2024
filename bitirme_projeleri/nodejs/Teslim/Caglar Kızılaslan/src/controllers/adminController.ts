import express from 'express';
import UserDB from '../models/userModel';
import NewsDB from '../models/newsModel';
import CommentDB from '../models/commentModel';

export const adminController = express.Router();


adminController.get('/', async (req, res) => {
  const user = res.locals.user;
  if (!user || user.role !== 'admin') {
    return res.redirect('/news/list');
  }

  const users = await UserDB.find({}).sort({ date: -1 });
  const posts = await NewsDB.find({}).populate('userID', 'surname lastname email').sort({ date: -1 });

  return res.render('admin', { users, posts, user });
});


adminController.get('/users/:id', async (req, res) => {
  const user = res.locals.user;
  if (!user || user.role !== 'admin') {
    return res.redirect('/news/list');
  }
  const u = await UserDB.findById(req.params.id);
  if (!u) return res.redirect('/admin');
  return res.render('adminUserEdit', { editUser: u });
});


adminController.post('/users/:id/update', async (req, res) => {
  const user = res.locals.user;
  if (!user || user.role !== 'admin') {
    return res.redirect('/news/list');
  }
  await UserDB.findByIdAndUpdate(req.params.id, {
    surname: req.body.surname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
  });
  return res.redirect('/news/list');
});

adminController.post('/users/:id/delete', async (req, res) => {
  const user = res.locals.user;
  if (!user || user.role !== 'admin') {
    return res.redirect('/news/list');
  }
  const posts = await NewsDB.find({ userID: req.params.id }, '_id');
  const postIds = posts.map(p => p._id);
  await NewsDB.deleteMany({ userID: req.params.id });
  if (postIds.length) {
    await CommentDB.deleteMany({ postID: { $in: postIds } });
  }
  await UserDB.findByIdAndDelete(req.params.id);
  return res.redirect('/news/list');
});