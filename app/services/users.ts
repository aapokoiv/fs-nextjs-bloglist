import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users, readingList } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export const getUserWithBlogs = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { blogs: true }
  })
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  })
}

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
  })
}

export const getUserReadingList = async (id: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, id),
    with: { blog: true }
  })
}

export const addUser = async (username: string, name: string, passwordHash: string) => {
  await db.insert(users).values({ username, name, passwordHash })
}

export const addUserToken = async (id: number, token: string) => {
  console.log("updating db")
  await db.update(users).set({ token: token }).where(eq(users.id, id))
  console.log("updated db")
}
