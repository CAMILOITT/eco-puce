import css from "./Avatar.module.css"
interface PropAvatar {
  avatar: string
  alt: string
}
export default function Avatar({ avatar, alt }: PropAvatar) {
  return <img src={avatar} alt={alt} className={css.avatar} />
}
