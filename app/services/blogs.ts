const blogs = [
{
  id: 1,
  title: 'first',
  author: 'aapo',
  url: 'https://react.dev/',
  likes: 2,
},
{
  id: 2,
  title: 'second',
  author: 'aapo',
  url: 'https://react.dev/',
  likes: 3,
},
{
  id: 3,
  title: 'testing docker',
  author: 'onni',
  url: 'https://docker.com/',
  likes: 1,
},
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const likeBlogById = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes = blog.likes + 1
  }
}
