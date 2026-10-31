import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog, addToReadingList } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div data-testid="blog-detail" className="panel space-y-4 break-words">
      <h2 data-testid="blog-title" className="page-title">{blog.title}</h2>
      <p data-testid="blog-author">author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button className="button" type="submit">
          Like
        </button>
      </form>
      <form action={addToReadingList}>
        <input type="hidden" name="id" value={blog.id} />
        <button data-testid="add-to-reading-list-button" className="button" type="submit">
          Add to reading list
        </button>
      </form>
    </div>
  )
}

export default BlogPage
