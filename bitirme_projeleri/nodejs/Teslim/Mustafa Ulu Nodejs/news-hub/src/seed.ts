import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { User } from "./models/User";
import Post from "./models/Post.model";
import Comment from "./models/Comment.model";

const MONGO_URI = process.env.MONGO_URI;

const runSeed = async () => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI missing in .env");
  }

  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");

  // Temizle
  await Comment.deleteMany({});
  await Post.deleteMany({});
  await User.deleteMany({});

  console.log("🧹 Collections cleaned");

  const passwordHash = await bcrypt.hash("123456", 10);

  // Admin
  const admin = await User.create({
    name: "Mustafa Admin",
    email: "mustafa@test.com",
    passwordHash,
    role: "admin",
  });

  // User
  const user = await User.create({
    name: "Mustafa User",
    email: "mustafa1@test.com",
    passwordHash,
    role: "user",
  });

  console.log("👤 Users created");

  // Postlar
  const post1 = await Post.create({
    title: "Admin Post 1",
    content: "Bu admin tarafından oluşturulan örnek post içeriğidir.",
    author: admin._id,
  });

  const post2 = await Post.create({
    title: "User Post 1",
    content: "Bu normal kullanıcı tarafından oluşturulan örnek post içeriğidir.",
    author: user._id,
  });

  console.log("📝 Posts created");

  // Commentler
  await Comment.create({
    post: post1._id,
    author: user._id,
    content: "User olarak admin postuna yorum yaptım.",
  });

  await Comment.create({
    post: post2._id,
    author: admin._id,
    content: "Admin olarak user postuna yorum yaptım.",
  });

  console.log("💬 Comments created");

  console.log("🎉 SEED DONE!");
  console.log("Admin => mustafa@test.com / 123456");
  console.log("User  => mustafa1@test.com / 123456");

  await mongoose.disconnect();
  process.exit(0);
};

runSeed().catch((err) => {
  console.error("❌ SEED ERROR:", err);
  process.exit(1);
});
