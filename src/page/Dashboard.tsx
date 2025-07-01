import { logout } from "../service/google/session"

interface PropDashboard {}

export default function Dashboard({}: PropDashboard) {
  return (
    <main>
      <div>
        <button>menu</button>
        <button onClick={logout}>cerrar session</button>
      </div>
      <h1>Bienvenido a EcoPUCE</h1>
      <div>
        <div>puntos de recolección</div>
        <div>escanear</div>
      </div>
      <div>
        <details>
          <summary>historial de puntos de recolección</summary>
          <ul>
            <li>punto 1</li>
            <li>punto 2</li>
            <li>punto 3</li>
            <li>punto 4</li>
            <li>punto 5</li>
            <li>punto 6</li>
            <li>punto 7</li>
            <li>punto 8</li>
          </ul>
        </details>
      </div>

      <div>
        <p>menu</p>
        <ul>
          <li>Inicio</li>
          <li>Historial</li>
          <li>Configuración</li>
          <li>Ayuda</li>
          <li>Acerca de nosotros</li>
        </ul>
      </div>
    </main>
  )
}
