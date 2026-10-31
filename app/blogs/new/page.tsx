"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog,
    { errors: {
      title: "",
      author: "",
      url: ""
    } })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="panel mx-auto max-w-lg space-y-6">
      <h2 className="page-title">Create a new blog</h2>
      <form className="form-fields" action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required defaultValue={state.values?.title} />
          </label>
          {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required defaultValue={state.values?.author} />
          </label>
          {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" required defaultValue={state.values?.url} />
          </label>
          {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </div>
        <button data-testid="create-blog-button" className="button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
