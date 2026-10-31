import { NextResponse, NextRequest } from "next/server"
import { getUserWithBlogs, getUserByToken } from "../../services/users"

export const GET = async (request: NextRequest) => {
  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return NextResponse.json(
      { error: "Missing token" },
      { status: 401 }
    )
  }

  const user = await getUserByToken(token)

  if (!user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }

  const userData = await getUserWithBlogs(user.id)
  return NextResponse.json(userData)
}
