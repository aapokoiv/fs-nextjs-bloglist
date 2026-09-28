import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

let nextId = 4

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url?: string, likes?: number) => {
  await db.insert(blogs).values({ title, author, url, likes })
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
