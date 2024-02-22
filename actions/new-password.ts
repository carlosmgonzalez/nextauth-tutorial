"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

interface Props {
  token: string;
  values: z.infer<typeof NewPasswordSchema>;
}

export const newPassword = async ({ token, values }: Props) => {
  const valiedField = NewPasswordSchema.safeParse(values);
  if (!valiedField.success) return { error: "Invalied fields!" };
  const { password } = valiedField.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Token not valid" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token is expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email not found!" };

  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated" };
};
