import Avatar from "../avatar/Avatar"

interface PropBanner {
  avatar: string
}

export default function Banner({ avatar }: PropBanner) {
  return (
    <div>
      <Avatar avatar={avatar} />
    </div>
  )
}
