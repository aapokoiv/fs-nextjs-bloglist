import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <p>title: {blog.title}</p>
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage
