import Avatar from "../avatar/Avatar"
import css from "./CardRankingUser.module.css"

interface PropCardRankingUser {
  avatar: string
  alt: string
  position: number
  points?: number
  botellas?: number
}

export default function CardRankingUser({
  avatar,
  alt,
  position,
  points = 100,
  botellas = 10,
}: PropCardRankingUser) {
  return (
    <div className={css.card_ranking_user}>
      <span className={css.position}>{position}</span>
      <div className={css.card_ranking_user_header}>
        <Avatar avatar={avatar} alt={alt} />
      </div>
      <span className={css.name}>Camilo</span>
      <div className={css.card_ranking_user_body}>
        <p className={css.points}>
          <span className={css.points_title}>Points:</span>
          <span> {points}</span>
        </p>
        <p className={css.bottle}>
          <span className={css.bottle_title}>Rank:</span>
          <span>{botellas}</span>
        </p>
      </div>
    </div>
  )
}
