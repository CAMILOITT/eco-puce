import css from "./BannerPoints.module.css"

interface PropBannerPoints {
  points: number
  bottles: number
  position: number
  ranking?: number
}

export default function BannerPoints({
  points,
  bottles,
  position,
}: PropBannerPoints) {
  return (
    <div className={css.banner_points}>
      <h3>Ranking</h3>
      <h4 className={css.position}>posición # {position}</h4>
      {/* <h3 className={css.text_points}>puntos obtenidos</h3> */}
      <span className={css.points}>{points}</span>
      <p className={css.bottles}>
        Has reciclado <span className={css.points_bottles}>{bottles}</span>{" "}
        botellas PET
      </p>
    </div>
  )
}
