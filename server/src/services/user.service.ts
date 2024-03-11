import { db } from "../db";
import { CreateUserInput, UpdateUserProfileInput, UserRole } from "../types";

async function createUser(userBody: CreateUserInput) {
  return await db.user.create({
    data: {
      ...userBody,
    },
  });
}

async function createGuest() {
  return await db.user.create({
    data: {
      role: UserRole.Guest,
      name: "Guest",
      color: "blue",
    },
  });
}

async function updateUserProfile(
  userId: string,
  userBody: UpdateUserProfileInput,
) {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      ...userBody,
    },
  });
}

async function findById(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function findByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email: email,
    },
  });
}

async function deleteById(id: string) {
  return await db.user.delete({
    where: {
      id,
    },
  });
}

export default {
  updateUserProfile,
  findById,
  findByEmail,
  createUser,
  createGuest,
  deleteById,
};
