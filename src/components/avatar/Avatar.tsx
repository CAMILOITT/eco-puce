interface PropAvatar {
  avatar: string
}

export default function Avatar({ avatar }: PropAvatar) {
  return <img src={avatar} />
}
