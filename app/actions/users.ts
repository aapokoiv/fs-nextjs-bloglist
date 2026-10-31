"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

import { addUser, getUserByUsername, addUserToken } from "../services/users"
import { getCurrentUser } from "../services/session"

type RegisterFormState = {
  errors: { username?: string; name?: string; password?: string; passwordConfirm?: string }
  values?: { username: string; name: string; password: string; passwordConfirm: string }
}

export const registerUser = async (_prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: RegisterFormState["errors"] = {}

  if (!username || username.length < 4) {
    errors.username = "username has to be at least 4 characters long"
  }

  if (!password || password.length < 4) {
    errors.password = "password has to be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "passwords do not match"
  }

  if (await getUserByUsername(username)) {
    errors.username = "username is already in use"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await addUser(username, name, passwordHash)

  redirect("/login")
}

export const generateTokenForUser = async () => {
  console.log("received")
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  console.log(user)

  const newToken = crypto.randomUUID()

  console.log("calling db")
  await addUserToken(user.id, newToken)

  console.log("revalidating")
  revalidatePath("/me")
  console.log("revalidated")
}
