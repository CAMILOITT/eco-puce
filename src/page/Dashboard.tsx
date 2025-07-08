import Banner from "../components/banner/Banner"
import BannerPoints from "../components/bannerPoints/BannerPoints"
import History from "../components/history/History"
import css from "./Dashboard.module.css"
interface PropDashboard {}

export default function Dashboard({}: PropDashboard) {
  return (
    <main className={css.main}>
      <Banner
        avatar="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
        alt="user"
        children={<h1>Bienvenido a EcoPUCE</h1>}
      />
      <div className={css.viewer}>
        <History history={[]} />
        <BannerPoints points={0} bottles={0} position={0} />
      </div>
    </main>
  )
}
