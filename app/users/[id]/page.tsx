import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserWithBlogs(Number(id))

  if (!user) {
    notFound()
  }

  return (
    <div className="panel space-y-4 break-words">
      <h2 className="page-title">{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3 className="border-t border-surface pt-4 text-lg font-semibold">Blogs</h3>
      <ul className="space-y-3">
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link className="text-link" href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
