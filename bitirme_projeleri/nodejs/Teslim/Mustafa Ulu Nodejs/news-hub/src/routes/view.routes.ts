import { Router } from "express";
import { viewAdmin } from "../controllers/viewAdmin.controller";
import { adminOnly } from "../middlewares/adminOnly";

import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
  viewHome,
} from "../controllers/viewAuth.controller";

import { requireSessionAuth } from "../middlewares/sessionAuth";

import {
  viewMyPosts,
  getNewPost,
  postNewPost,
  viewPostDetail,
  addComment,
  deletePost,
  getEditPost,
  postEditPost,
} from "../controllers/viewPost.controller";

const router = Router();

// Public
router.get("/", viewHome);

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/admin", requireSessionAuth, adminOnly, viewAdmin);


router.get("/logout", logout);

// Protected
router.get("/dashboard", requireSessionAuth, viewMyPosts);

router.get("/posts/new", requireSessionAuth, getNewPost);
router.post("/posts/new", requireSessionAuth, postNewPost);

router.get("/posts/:id", requireSessionAuth, viewPostDetail);
router.post("/posts/:id/comments", requireSessionAuth, addComment);

router.get("/posts/:id/edit", requireSessionAuth, getEditPost);
router.post("/posts/:id/edit", requireSessionAuth, postEditPost);

router.post("/posts/:id/delete", requireSessionAuth, deletePost);

export default router;
