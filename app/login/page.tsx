"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("logged in")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="panel mx-auto max-w-lg space-y-6">
      <h2 className="page-title">Login</h2>
      {error && <p data-testid="error-message" style={{ color: "red" }}>{error}</p>}
      <form className="form-fields" onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <button data-testid="login-button" className="button" type="submit">Login</button>
      </form>
    </div>
  )
}
