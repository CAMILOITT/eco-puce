import { useState } from "react"
import { Link, useLocation } from "wouter"
import { auth } from "../service/google/config"
import { login } from "../service/google/session"
import css from "./Index.module.css"

interface PropIndex {}

export default function Index({}: PropIndex) {
  const [_, navigate] = useLocation()
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <main className={css.main}>
      <h1>Bienvenido a EcoPUCE</h1>
      <p>
        EcoPUCE es un proyecto que busca fomentar el reciclaje de botellas PET
        en la comunidad universitaria de la PUCE.
      </p>

      <div>
        <button
          onClick={async () => {
            if (!auth) {
              await login(() => navigate("/dashboard"))
            }
            navigate("/dashboard")
          }}>
          Comenzar a reciclar
        </button>
      </div>

      <Link
        href="/about"
        className={css.link_about}
        onMouseMove={handleMove}
        style={{ "--top": `${pos.y}px`, "--left": `${pos.x}px` }}>
        <h2>Conocer mas sobre este proyecto</h2>
        <p>
          Este es un pequeño proyecto de estudiante de la facultad de Ingeniería
          el cual busca crear conciencia en el reciclaje de botella PET
        </p>
      </Link>
    </main>
  )
}
