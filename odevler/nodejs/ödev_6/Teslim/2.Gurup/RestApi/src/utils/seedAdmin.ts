import bcrypt from "bcrypt";
import UserDB from "../models/userModel";

export async function seedDefaultAdmin() {
  // Admin var mı kontrolü
  const adminExists = await UserDB.exists({ roles: { $in: ["Admin"] } });
  if (adminExists) return;

  // .env üzerinden veya varsayılan
  const name = process.env.ADMIN_NAME || "admin";
  const email = process.env.ADMIN_EMAIL || "JohnnyLesh@Waterloo.com";
  const password = process.env.ADMIN_PASSWORD || "123456";

  // Aynı email varsa sadece rolü Admin’e çek
  const existing = await UserDB.findOne({ email });
  if (existing) {
    if (!existing.roles.includes("Admin")) {
      existing.roles = [...existing.roles, "Admin"];
      await existing.save();
      console.log(`Default admin role added for existing user: ${email}`);
    }
    return;
  }

  // Yeni Admin oluştur
  const hash = await bcrypt.hash(password, 10);
  const admin = new UserDB({
    name,
    email,
    password: hash,
    roles: ["Admin"],
  });
  await admin.save();
  console.log(`Default admin seeded: ${email}`);
}