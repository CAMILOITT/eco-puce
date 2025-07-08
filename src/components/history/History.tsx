import { Link } from "wouter"
import css from "./History.module.css"

interface PropHistory {
  history: {
    day: string
    bottles: number
    points: number
  }[]
}

export default function History({ history }: PropHistory) {
  return (
    <div className={css.history}>
      <h2 className={css.title}>Historial de puntos</h2>
      <details open className={css.details}>
        <summary className={css.month}>Junio</summary>
        {history.length < 1 ? (
          <p className={css.message} >
            Aun no has reciclado ninguna botella, comienza a hacer el cambio
          </p>
        ) : (
          <div className={css.summary}>
            <table className={css.table}>
              <thead className={css.thead}>
                <th>dia</th>
                <th>botellas</th>
                <th>puntos</th>
              </thead>
              <tbody className={css.tbody}>
                {history.map(({ day, bottles, points }) => (
                  <tr>
                    <td>{day}</td>
                    <td>{bottles}</td>
                    <td>{points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/dashboard/history" className={css.view_more}>
              Ver mas
            </Link>
          </div>
        )}
      </details>
    </div>
  )
}
