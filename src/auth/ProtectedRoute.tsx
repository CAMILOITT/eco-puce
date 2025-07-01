import type { JSX } from "react"
import { Redirect } from "wouter"
import { useAuth } from "../hooks/useAuth"

interface PropProtectedRoute {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: PropProtectedRoute) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Redirect to="/login" replace />
  return children
}
