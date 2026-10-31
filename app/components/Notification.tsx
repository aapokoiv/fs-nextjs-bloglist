"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  return (
    <div data-testid="notification" role={type === "error" ? "alert" : "status"} className={`mb-6 rounded-lg border-l-4 p-4 ${type === 'success' ? 'border-green-200 text-green-700 bg-green-100' : 'border-red-200 text-red-700 bg-red-100'}`}>
      {message}
    </div>
  )
}
