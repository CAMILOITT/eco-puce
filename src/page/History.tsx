import css from "./History.module.css"
interface PropHistory {}

const history: { date: string; n_botellas: number; n_points: number }[] = [
  { date: "07-07-25", n_botellas: 3, n_points: 2 },
]

export default function History({}: PropHistory) {
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
              <td># botellas</td>
              <td># puntos</td>
            </tr>
          </thead>
          <tbody>
            {history.map(({ date, n_botellas, n_points }) => (
              <tr>
                <td>{date}</td>
                <td>{n_botellas}</td>
                <td>{n_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
