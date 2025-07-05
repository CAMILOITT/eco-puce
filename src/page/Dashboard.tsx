import { useState } from "react"
import Aside from "../components/aside/Aside"
import Banner from "../components/banner/Banner"
import BannerPoints from "../components/bannerPoints/BannerPoints"
import History from "../components/history/History"

interface PropDashboard {}

export default function Dashboard({}: PropDashboard) {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <main>
      <Aside open={openMenu} setOpen={setOpenMenu} />
      <div>
        <button
          onClick={() => {
            setOpenMenu(value => !value)
          }}>
          menu
        </button>
      </div>
      <h1>Bienvenido a EcoPUCE</h1>
      <Banner avatar="" />
      <History />
      <BannerPoints />
    </main>
  )
}
