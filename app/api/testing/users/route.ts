import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "../../../../db"
import { users } from "../../../../db/schema"

export const POST = async (request: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await request.json()
  const username = body.username.trim()
  const name = body.name.trim()
  const password = body.password

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await db.insert(users).values({ username, name, passwordHash })

  if (!user) {
    return NextResponse.json({ error: "Username is already in use" }, { status: 409 })
  }

  return NextResponse.json(user, { status: 201 })
}
