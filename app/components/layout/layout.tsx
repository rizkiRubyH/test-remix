import { Form, Link } from "@remix-run/react"
import type { FC, ReactNode } from "react"
import type { ActionFunction } from "@remix-run/node";
import { logout } from "~/sessions";

export interface LayoutProps {
  children: ReactNode
  userLogin: {
    userName: string,
    session: any
  }
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children, userLogin } = props

  return (
    <>
      <nav className="bg-white drop-shadow-md h-16 w-full flex justify-between items-center px-10">
        <Link to="/">
          <p className="">Home</p>
        </Link>
        {userLogin.userName ? (
          <Link to="/logout">
            <p className="">Logout</p>
          </Link>
        ) : (
          <Link to="/login">
            <p className="">Login</p>
          </Link>
        )}
      </nav>
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}


