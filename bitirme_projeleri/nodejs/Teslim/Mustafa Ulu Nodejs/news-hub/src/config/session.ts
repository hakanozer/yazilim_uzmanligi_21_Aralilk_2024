import session from "express-session";
import MongoStore from "connect-mongo";

export const sessionMiddleware = session({
  name: process.env.SESSION_NAME || "newshub.sid",
  secret: process.env.SESSION_SECRET || "change_me",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gün
    sameSite: "lax",
    secure: false, // prod ortamında HTTPS ise true yap
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || "",
    collectionName: "sessions",
  }),
});
