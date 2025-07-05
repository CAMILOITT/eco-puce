import { useState } from "react"
import Aside from "../components/aside/Aside"
import Banner from "../components/banner/Banner"
import BannerPoints from "../components/bannerPoints/BannerPoints"
import History from "../components/history/History"
import { logout } from "../service/google/session"

interface PropDashboard {}

export default function Dashboard({}: PropDashboard) {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <main>
      <Aside open={openMenu} />
      <div>
        <button
          onClick={() => {
            setOpenMenu(value => !value)
          }}>
          menu
        </button>
        <button onClick={logout}>cerrar session</button>
      </div>
      <h1>Bienvenido a EcoPUCE</h1>
      <Banner avatar="" />
      <History />
      <BannerPoints />
    </main>
  )
}
