import { IconCamera } from "@tabler/icons-react"
import { use } from "react"
import { Link } from "wouter"
import Banner from "../components/banner/Banner"
import BannerPoints from "../components/bannerPoints/BannerPoints"
import History from "../components/history/History"
import css from "./Dashboard.module.css"
interface PropDashboard {
  fetchUserPosition: Promise<{
    position: number
    id: string
    name: string
    totalPoints: number
    totalBottles: number
  } | null>
}

export default function Dashboard({ fetchUserPosition }: PropDashboard) {
  const userPosition = use(fetchUserPosition)
  return (
    <main className={css.main}>
      <Banner
        avatar="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
        alt="user"
        children={<h1>Bienvenido a EcoPUCE</h1>}
      />
      <div className={css.viewer}>
        <History />
        <Link to="/camera" className={css.link_camera}>
          <IconCamera size={80} />
        </Link>
        <BannerPoints
          points={userPosition?.totalPoints ?? 0}
          bottles={userPosition?.totalBottles ?? 0}
          position={userPosition?.position ?? 0}
        />
      </div>
    </main>
  )
}
