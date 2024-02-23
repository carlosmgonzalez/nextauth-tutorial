"use server";

import { getAccountByUserId } from "@/data/account";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const validateFields = SettingsSchema.safeParse(values);
  if (!validateFields.success) return { error: "Invalid fields!!" };

  let { newPassword, ...data } = validateFields.data;

  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized" };

  if (user.isOAuth) {
    newPassword = undefined;
    data.password = undefined;
    data.email = undefined;
    data.isTwoFactorEnabled = undefined;
  }

  if (data.email && data.email !== user.email) {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser && existingUser.id !== user.id)
      return { error: "Email already in use!" };

    const verificationToken = await generateVerificationToken(data.email);
    await sendVerificationEmail(data.email, verificationToken.token);
  }

  if (data.password && newPassword && dbUser.password) {
    const validatePassword = await bcrypt.compare(
      data.password,
      dbUser.password
    );
    if (!validatePassword) return { error: "Password incorrect!!" };

    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    data.password = hashNewPassword;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...data,
    },
  });

  return { success: "Settings success" };
};
