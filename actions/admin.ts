"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Voce tem permissão para essa server action!" };
  }

  return { error: "Você não tem permissão para essa server action!" }
};