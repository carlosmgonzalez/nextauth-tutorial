"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }
  const { email } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return { error: "Email not found" };

    const resetPasswordToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      resetPasswordToken.email,
      resetPasswordToken.token
    );

    return { success: "Reset email sent!" };
  } catch (error) {
    return { error: "something went wrong" };
  }
};
