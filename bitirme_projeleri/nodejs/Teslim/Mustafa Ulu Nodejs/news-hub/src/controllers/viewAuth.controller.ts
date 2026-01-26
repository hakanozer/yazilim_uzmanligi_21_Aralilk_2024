import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

function safeUser(sessionUser: any) {
  if (!sessionUser) return null;
  return {
    id: sessionUser.id,
    email: sessionUser.email,
    role: sessionUser.role,
    name: sessionUser.name,
  };
}

export const viewHome = (req: Request, res: Response) => {
  res.render("pages/home", { user: safeUser(req.session.user) });
};

export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login", { error: null, user: safeUser(req.session.user) });
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result: any = await loginUser(email, password);

    // loginUser dönüşü projeye göre değişebilir diye sağlam aldım:
    const u =
      result?.user ||
      result?.data?.user ||
      result?.result?.user ||
      result?.payload?.user;

    if (!u) {
      return res.status(401).render("auth/login", {
        error: "Invalid email or password",
        user: safeUser(req.session.user),
      });
    }

    req.session.user = {
  id: u._id?.toString?.() ?? u.id,
  email: u.email,
  role: (u.role || "user") as "user" | "admin",
  name: u.name,
};

return req.session.save((err) => {
  if (err) console.error("SESSION SAVE ERROR (login) =>", err);
  return res.redirect("/dashboard");
});


    return res.redirect("/dashboard");
  } catch (err) {
    console.error("EJS LOGIN ERROR =>", err);
    return res.status(500).render("auth/login", {
      error: "Server error",
      user: safeUser(req.session.user),
    });
  }
};

export const getRegister = (req: Request, res: Response) => {
  res.render("auth/register", { error: null, user: safeUser(req.session.user) });
};

export const postRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const created: any = await registerUser(name, email, password);

    // registerUser bazen {user: ...} dönebilir, onu da yakala
    const u = created?.user || created;

   req.session.user = {
  id: u._id?.toString?.() ?? u.id,
  email: u.email,
  role: (u.role || "user") as "user" | "admin",
  name: u.name,
};

return req.session.save((err) => {
  if (err) console.error("SESSION SAVE ERROR (register) =>", err);
  return res.redirect("/dashboard");
});


    return res.redirect("/dashboard");
  } catch (err) {
    console.error("EJS REGISTER ERROR =>", err);
    return res.status(500).render("auth/register", {
      error: "Server error",
      user: safeUser(req.session.user),
    });
  }
};

export const viewDashboard = (req: Request, res: Response) => {
  res.render("pages/dashboard", { user: safeUser(req.session.user) });
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie(process.env.SESSION_NAME || "newshub.sid");
    res.redirect("/login");
  });
};
