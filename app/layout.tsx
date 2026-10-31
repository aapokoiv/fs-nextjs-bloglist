import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar/>
            <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
              <Notification />
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
