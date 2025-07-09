import Avatar from "../avatar/Avatar"
import css from "./CardRankingUser.module.css"

interface PropCardRankingUser {
  avatar: string
  alt: string
  position: number
  points?: number
  bottles?: number
  name: string
}

export default function CardRankingUser({
  avatar,
  alt,
  position,
  points = 100,
  bottles = 10,
  name,
}: PropCardRankingUser) {
  return (
    <div className={css.card_ranking_user}>
      <span className={css.position}>{position}</span>
      <div className={css.card_ranking_user_header}>
        <Avatar avatar={avatar} alt={alt} />
        <span className={css.name}>{name}</span>
      </div>
      <div className={css.card_ranking_user_body}>
        <p className={css.points}>
          <span className={css.points_title}>Puntos</span>
          <span> {points}</span>
        </p>
        <p className={css.bottle}>
          <span className={css.bottle_title}>Botellas</span>
          <span>{bottles}</span>
        </p>
      </div>
    </div>
  )
}
