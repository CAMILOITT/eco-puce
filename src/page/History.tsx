import { use } from "react"
import type { UserHistory } from "../types/history.type"
import css from "./History.module.css"

interface PropHistory {
  historyPromise: Promise<UserHistory[]>
}

export default function History({ historyPromise }: PropHistory) {
  const userHistory = use<UserHistory[]>(historyPromise)

  return (
    <div className={css.main}>
      <h1>historial</h1>

      <p className={css.description}>
        Aquí se muestra el historial de botellas y puntos obtenidos.
      </p>

      <div>gráfico</div>

      {history.length < 1 ? (
        <>
          <p>Sin registros por ahora.</p>
          <p>¡Escanea tu primera botella para comenzar!</p>
        </>
      ) : (
        <table className={css.table}>
          <thead>
            <tr>
              <td>fecha</td>
              <td># puntos</td>
            </tr>
          </thead>
          <tbody>
            {userHistory.map(({ id, date, points }) => (
              <tr key={id}>
                <td>
                  {date.toDate ? date.toDate().toLocaleString() : String(date)}
                </td>
                <td>{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
