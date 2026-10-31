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

  const filteredBlogs = (filter != null) ? sortedBlogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase())) : sortedBlogs

  return (
    <div className="space-y-6">
      <h2 className="page-title">Blogs</h2>
      <form className="flex flex-col gap-3 sm:flex-row" action={updateSearch}>
        <input data-testid="filter-input" className="search-input" aria-label="Search blogs by title" type="text" name="search" defaultValue={filter} />
        <button data-testid="search-button" className="button" type="submit">
          Search
        </button>
      </form>
      <ul data-testid="blogs-list" className="grid gap-4 sm:grid-cols-2">
        {filteredBlogs.map((blog) => (
          <li className="panel space-y-2 break-words" key={blog.id}>
            <Link className="text-link text-lg" href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>author: {blog.author}</p>
            <p>url: {blog.url}</p>
            <p>{blog.likes} likes</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
