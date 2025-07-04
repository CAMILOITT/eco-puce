import { useState } from "react"
import Aside from "../components/aside/Aside"
import Banner from "../components/banner/Banner"
import BannerPoints from "../components/bannerPoints/BannerPoints"
import History from "../components/history/History"

interface PropDashboard {}

export default function Dashboard({}: PropDashboard) {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        minHeight: "100vh",
      }}>
      <Aside open={openMenu} setOpen={setOpenMenu} />
      <div>
        <button
          onClick={() => {
            setOpenMenu(value => !value)
          }}>
          menu
        </button>
      </div>

      <Banner
        avatar="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
        alt="user"
        children={<h1>Bienvenido a EcoPUCE</h1>}
      />
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <History history={[]} />
        <BannerPoints points={0} bottles={0} position={0} />
      </div>
    </main>
  )
}
