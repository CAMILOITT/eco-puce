import Avatar from "../avatar/Avatar"
import css from "./Podium.module.css"

interface PropPodium {
  position: "first" | "second" | "third"
  avatarImg: string
  alt: string
  points: number
  bottle: number
  name: string
}

export default function Podium({
  points,
  avatarImg,
  position,
  alt,
  bottle,
  name,
}: PropPodium) {
  return (
    <div className={css.user_podium}>
      <Avatar avatar={avatarImg} alt={alt} />
      <div className={`${css.podium} ${css[position]}`}>
        <span>{name}</span>
        <span>points</span>
        <span>{points}</span>
        <span>bottle</span>
        <span>{bottle}</span>
      </div>
    </div>
  )
}
