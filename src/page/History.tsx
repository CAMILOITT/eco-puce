interface PropHistory {}

export default function History({}: PropHistory) {
  return (
    <div>
      <h1>historial</h1>

      <p>Aquí se muestra el historial de botellas y puntos obtenidos.</p>

      {1 < 1 ? (
        <p>¡No hay historial!</p>
      ) : (
        <table>
          <thead>
            <th>
              <td>fecha</td>
              <td>n botellas</td>
              <td>n puntos</td>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>2023-10-01</td>
              <td>5</td>
              <td>10</td>
            </tr>
            <tr>
              <td>2023-10-02</td>
              <td>3</td>
              <td>6</td>
            </tr>
            <tr>
              <td>2023-10-03</td>
              <td>8</td>
              <td>16</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
