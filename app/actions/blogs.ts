"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlogById, addBlogToReadingList, updateBlogReadStatus } from "../services/blogs"
import { auth } from "@/auth"

type BlogFormState = {
  errors: { title?: string; author?: string; url?: string }
  values?: { title: string; author: string; url: string }
  success?: boolean
}

export const createBlog = async (_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: { title?: string; author?: string; url?: string } = {}

  if (!title || title.length < 5) {
    errors.title = "title must be at least 5 characters long"
  }
  if (!author || author.length < 5) {
    errors.author = "author must be at least 5 characters long"
  }
  if (!url || url.length < 5) {
    errors.url = "url must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { errors: {}, success: true }
}

export const likeBlog = async (formdata: FormData) => {
  const id = Number(formdata.get("id"))
  await likeBlogById(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addToReadingList = async (formdata: FormData) => {
  const id = Number(formdata.get("id"))
  await addBlogToReadingList(id)

  revalidatePath(`/blogs/${id}`)
}

export const markBlogAsRead = async (formdata: FormData) => {
  const id = Number(formdata.get("id"))
  await updateBlogReadStatus(id)

  revalidatePath('/me')
}

export const updateSearch = async (formdata: FormData) => {
  const search = formdata.get("search") as string
  if (search !== "") {
    redirect(`/blogs?filter=${search}`)
  } else {
    redirect(`/blogs`)
  }
}
