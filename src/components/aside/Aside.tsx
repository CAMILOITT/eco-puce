import { Link } from "wouter"
import { logout } from "../../service/google/session"
import css from "./Aside.module.css"

interface PropAside {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function Aside({ open, setOpen }: PropAside) {
  return (
    <div className={`${css.menu}  ${!open ? css.activate : ""} `}>
      <div className={css.header}>
        <button
          className={`${css.close_btn} ${css.close_btn_activate}`}
          onClick={() => setOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className={css.content}>
        <Link className={css.link} to="/dashboard">
          Inicio
        </Link>
        <Link className={css.link} to="/ranking">
          Ranking
        </Link>
        <Link className={css.link} to="/History">
          Historial
        </Link>
      </div>
      <div className={css.footer}>
        {/* <button>configuration</button> */}
        {/* <button>cuenta</button> */}
        <button onClick={logout}>cerrar session</button>
      </div>
    </div>
  )
}
