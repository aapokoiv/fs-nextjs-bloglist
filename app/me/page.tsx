import Link from "next/link"
import { redirect } from "next/navigation"
import { markBlogAsRead } from "../actions/blogs"
import { getCurrentUser } from "../services/session"
import { generateTokenForUser } from "../actions/users"
import { getUserReadingList } from "../services/users"
import { auth } from "@/auth"

const Profile = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const readingList = await getUserReadingList(user.id)
  console.log(readingList)

  return (
    <div data-testid="user-profile" className="panel space-y-4 break-words">
      <h2 className="page-title">My Profile</h2>
      <p data-testid="user-name">Name: {user.name}</p>
      <p data-testid="user-username">Username: {user.username}</p>
      <div data-testid="reading-list-section">
        <h3 className="page-title">Reading-List:</h3>
        {readingList.length === 0 && <p data-testid="empty-reading-list">Your reading list is empty</p>}
        <div data-testid="unread-section">
          <h4 className='font-bold text-lg mt-4'>Unread: </h4>
          {!readingList.some((entry) => !entry.read) && <p data-testid="no-unread-blogs">No unread blogs</p>}
          <ul className="space-y-3">
            {readingList
              .filter((entry) => !entry.read)
              .map((entry) => (
                <li className='mb-2 mt-2' key={entry.id}>
                  <div className="flex justify-between panel">
                    <Link className='text-link' href={`/blogs/${entry.blog.id}`}>
                      {entry.blog.title}
                    </Link>
                    <form action={markBlogAsRead}>
                      <input type="hidden" name="id" value={entry.id} />
                      <button data-testid={`mark-read-${entry.id}`} className='button' type="submit">Mark as read</button>
                    </form>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h4 className='font-bold text-lg mt-4'>Read: </h4>
          <ul className="space-y-3">
            {readingList
              .filter((entry) => entry.read)
              .map((entry) => (
                <li className='mb-2 mt-2 panel' key={entry.id}>
                  <Link className='text-link' href={`/blogs/${entry.blog.id}`}>
                    {entry.blog.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <h3 className="page-title">API token:</h3>
      <div data-testid="api-token-section">
        <p>Current token:</p>
        <p data-testid={user.token ? "token-display" : "no-token-message"} className='panel mt-2 mb-2'>{user.token ? <span data-testid="api-token">{user.token}</span> : 'No token generated yet'}</p>
        <form action={generateTokenForUser}>
          <button data-testid="generate-token-button" className='button' type="submit">
            {user.token ? 'Generate new token' : 'Generate a token'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
