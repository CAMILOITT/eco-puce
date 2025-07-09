import type { JSX } from "react"
import { Redirect } from "wouter"
import { auth } from "../service/google/config"

interface PropProtectedRoute {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: PropProtectedRoute) {
  const user = auth.currentUser
  if (!user) return <Redirect to="/" replace />
  return children
}
