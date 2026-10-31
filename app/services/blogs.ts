import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url?: string, likes?: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  await db.insert(blogs).values({ title, author, url, likes, userId: user.id })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

export const likeBlogById = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    blog.likes = blog.likes + 1
  }
}

export const addBlogToReadingList = async (id: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const blog = await getBlogById(id)
  if (blog) {
    await db.insert(readingList).values({ userId: user.id, blogId: blog.id, read: false })
  }
}

export const updateBlogReadStatus = async (id: number) => {
  await db.update(readingList).set({ read: true }).where(eq(readingList.id, id))
}
