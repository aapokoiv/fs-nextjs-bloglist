import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { updateSearch } from "../actions/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {

  const { filter } = await searchParams

  const blogs = await getBlogs()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const filteredBlogs = (filter != null) ? sortedBlogs.filter((blog) => blog.title.toLowerCase().includes(filter)) : sortedBlogs

  return (
    <div>
      <h2>Blogs</h2>
      <form action={updateSearch}>
        <input type="text" name="search" />
        <button type="submit">
          Search
        </button>
      </form>
      <ul>
        {filteredBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>author: {blog.author}</p>
            <p>url: {blog.url}</p>
            <p>likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
