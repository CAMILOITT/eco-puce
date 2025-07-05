import Avatar from "../avatar/Avatar"
import css from "./Banner.module.css"
interface PropBanner {
  avatar: string
  alt: string
  children?: React.ReactNode
}

export default function Banner({ avatar, alt, children }: PropBanner) {
  return (
    <div className={css.banner}>
      <div>{children}</div>
      <Avatar avatar={avatar} alt={alt} />
    </div>
  )
}
