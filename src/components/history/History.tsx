"use server"
import { useEffect, useState } from "react"
import { Link } from "wouter"
import { auth } from "../../service/google/config"
import { getHistory } from "../../service/google/db/reciclar"
import type { UserHistory } from "../../types/history.type"
import css from "./History.module.css"

interface PropHistory {}

export default function History({}: PropHistory) {
  const [history, setHistory] = useState<UserHistory[]>([])

  useEffect(() => {
    getHistory(auth.currentUser?.uid).then(res => setHistory(res))
  }, [])

  return (
    <div className={css.history}>
      <h2 className={css.title}>Historial de puntos</h2>
      <details open className={css.details}>
        <summary className={css.month}>Julio</summary>
        {history.length < 1 ? (
          <p className={css.message}>
            Aun no has reciclado ninguna botella, comienza a hacer el cambio
          </p>
        ) : (
          <div className={css.summary}>
            <table className={css.table}>
              <thead className={css.thead}>
                <th>dia</th>
                <th>puntos</th>
              </thead>
              <tbody className={css.tbody}>
                {history.map(({ date, points }) => (
                  <tr>
                    <td>
                      {date.toDate
                        ? date.toDate().toLocaleDateString()
                        : String(date)}
                    </td>
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
