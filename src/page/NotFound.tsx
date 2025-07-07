import { Link } from "wouter"
import { useAuth } from "../hooks/useAuth"
import css from "./NotFound.module.css"

interface PropNotFound {}

export default function NotFound({}: PropNotFound) {
  const { user } = useAuth()

  return (
    <main className={css.main}>
      <h1>Error 404 - Pagina no encontrada</h1>
      <p>Parece que esta ruta terminó en el tacho equivocado.</p>
      {!user ? (
        <Link to="/" className={css.link}>
          Ir a la pantalla de inicio
        </Link>
      ) : (
        <Link to="/dashboard" className={css.link}>
          Ir al dashboard
        </Link>
      )}
    </main>
  )
}
