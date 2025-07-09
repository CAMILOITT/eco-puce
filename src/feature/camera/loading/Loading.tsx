import { IconCircleDashedCheck } from "@tabler/icons-react"
import css from "./Loading.module.css"

interface PropLoading {}

export default function Loading({}: PropLoading) {
  return (
    <div className={css.loading}>
      <IconCircleDashedCheck scale={3} /> <p>validando imagen...</p>
    </div>
  )
}
