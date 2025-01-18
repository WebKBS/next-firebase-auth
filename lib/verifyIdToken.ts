"use server";
import "server-only";

import admin from "@/services/firebase-admin";

export const verifyIdToken = async (token: string) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch {
    return null;
  }
};
