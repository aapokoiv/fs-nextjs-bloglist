"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav aria-label="Main navigation" className="border-b border-surface">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-1 px-4 py-4 sm:px-6">
        <Link className="nav-link" href="/">home</Link>
        <Link className="nav-link" href="/blogs">blogs</Link>
        <Link className="nav-link" href="/users">users</Link>
        {session ? (
          <>
            <Link className="nav-link" href="/blogs/new">create new</Link>
            <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
              <Link className="nav-link" href="/me">me</Link>
              <em className="px-3 text-sm">{session.user?.name} logged in</em>
              <button className="button" onClick={() => signOut()}>logout</button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1 sm:ml-auto">
            <Link className="nav-link" href="/login">login</Link>
            <Link className="nav-link" href="/register">register</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
