import css from "./Aside.module.css"

interface PropAside {
  open: boolean
}

export default function Aside({open}: PropAside) {
  return <div className={`${css.menu}  ${!open ? css.activate : ''} `}>
    <button>Inicio</button>
    <button>configuracion</button>
    <button>cuenta</button>
  </div>
}
