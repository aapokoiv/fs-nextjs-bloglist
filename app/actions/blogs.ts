 "use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlogById } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  addBlog(title, author, url)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formdata: FormData) => {
  const id = Number(formdata.get("id"))
  likeBlogById(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const updateSearch = async (formdata: FormData) => {
  const search = formdata.get("search") as string
  if (search !== "") {
    redirect(`/blogs?filter=${search}`)
  } else {
    redirect(`/blogs`)
  }
}
