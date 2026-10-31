import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="space-y-6">
      <h2 className="page-title">Users</h2>
      <ul className="divide-y divide-surface rounded-xl border border-surface">
        {users.map((user) => (
          <li className="px-5 py-4 break-words" key={user.id}>
            <Link className="text-link" href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
