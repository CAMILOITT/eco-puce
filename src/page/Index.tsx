import { Link, useLocation } from "wouter"
import { login } from "../service/google/session"

interface PropIndex {}

export default function Index({}: PropIndex) {
  const [_, navigate] = useLocation()
  return (
    <main>
      <h1>Bienvenido a EcoPUCE</h1>
      <div>animacion de reciclaje</div>
      <p>
        EcoPUCE es un proyecto que busca fomentar el reciclaje de botellas PET
        en la comunidad universitaria de la PUCE.
      </p>

      <div>
        {/* hacer flotante y atractivo para el cliente */}
        <button
          onClick={() => {
            login(() => navigate("/dashboard"))
          }}>
          Comenzar a reciclar
        </button>
      </div>

      <Link href="/about">
        <h2>Conocer mas sobre este proyecto</h2>
        <p>
          Este es un pequeño proyecto de estudiante de la facultad de Ingeniería
          el cual busca crear conciencia en el reciclaje de botella PET
        </p>
        {/* aplicar click al movimiento animacion, seguimiento del raton */}
      </Link>
      <div>copyright</div>
    </main>
  )
}
