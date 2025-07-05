import { Link } from "wouter"
import css from "./History.module.css"
interface PropHistory {}

export default function History({}: PropHistory) {
  return (
    <div className={css.history}>
      <h2 className={css.title}>Historial de puntos</h2>
      <details open>
        <summary className={css.month}>Junio</summary>
        <table className={css.table}>
          <thead className={css.thead}>
            <th>dia</th>
            <th>botellas</th>
            <th>puntos</th>
          </thead>
          <tbody className={css.tbody}>
            <tr>
              <td>lun</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <Link to="/dashboard/history">Ver mas</Link>
      </details>
    </div>
  )
}
