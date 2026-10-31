"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser,
    { errors: {
      username: "",
      name: "",
      password: "",
      passwordConfirm: ""
    } })

  return (
    <div className="panel mx-auto max-w-lg space-y-6">
      <h2 className="page-title">Register</h2>
      <form className="form-fields" action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required defaultValue={state.values?.username} />
          </label>
          {state.errors.username && <p data-testid="username-error" style={{ color: "red" }}>{state.errors.username}</p>}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.values?.name} />
          </label>
          {state.errors.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required defaultValue={state.values?.password} />
          </label>
          {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required defaultValue={state.values?.passwordConfirm} />
          </label>
          {state.errors.passwordConfirm && <p data-testid="passwordConfirm-error" style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
        </div>
        <button data-testid="register-button" className="button" type="submit">Register</button>
      </form>
    </div>
  )
}
