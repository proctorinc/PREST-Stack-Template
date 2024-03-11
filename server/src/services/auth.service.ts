import { Request } from "express";
import { generateOTP } from "../utils";
import { db } from "../db";

function createUserSession(req: Request, userId: string) {
  req.session.userId = userId;
}

async function validateAuthToken(userId: string, authToken: string) {
  const tokenMatch = await getAuthTokenMatch(userId, authToken);

  // Token must exist, must be valid, and can't be expired,
  if (
    tokenMatch != null &&
    tokenMatch.isValid &&
    tokenMatch.expirationDate < new Date()
  ) {
    return true;
  } else {
    return false;
  }
}

async function createAuthToken(userId: string) {
  // Invalidate all previous auth tokens for user
  await invalidateAllUserAuthToken(userId);
  return await db.authToken.create({
    data: {
      value: generateOTP(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

async function invalidateAuthToken(userId: string, tokenValue: string) {
  return await db.authToken.update({
    where: {
      userId,
      value: tokenValue,
    },
    data: {
      isValid: false,
    },
  });
}

async function invalidateAllUserAuthToken(userId: string) {
  return await db.authToken.updateMany({
    where: {
      userId,
    },
    data: {
      isValid: false,
    },
  });
}

async function getAuthTokenMatch(userId: string, tokenValue: string) {
  return await db.authToken.findUnique({
    where: {
      userId,
      value: tokenValue,
    },
  });
}

export default {
  createUserSession,
  validateAuthToken,
  createAuthToken,
  getAuthTokenMatch,
  invalidateAuthToken,
};
