import { Link, useLocation } from "wouter"
import { login } from "../service/google/session"

interface PropIndex {}

export default function Index({}: PropIndex) {
  const [_, navigate] = useLocation()
  return (
    <main>
      <h1>Bienvenido a EcoPUCE</h1>
      <p>
        EcoPUCE es un proyecto que busca fomentar el reciclaje de botellas PET
        en la comunidad universitaria de la PUCE.
      </p>

      <div>
        <button
          onClick={() => {
            login()

            navigate("/dashboard")
            console.log("Login successful, redirecting to dashboard...")
          }}>
          Comenzar a reciclar
        </button>
      </div>

      <div>
        <h2>Conocer mas sobre este proyecto</h2>
        <p>
          Este es un pequeño proyecto de estudiante de la facultad de Ingeniería
          el cual busca crear conciencia en el reciclaje de botella PET
        </p>

        <div>
          <Link href="/about">Conocer mas</Link>
        </div>
      </div>
    </main>
  )
}
