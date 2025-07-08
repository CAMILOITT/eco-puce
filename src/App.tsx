import { useState } from "react"
import { Route, Switch } from "wouter"
import "./App.css"
import Aside from "./components/aside/Aside"
import Camera from "./feature/camera/Camera"
import About from "./page/About"
import Dashboard from "./page/Dashboard"
import History from "./page/History"
import Index from "./page/Index"
import NotFound from "./page/NotFound"
import Ranking from "./page/Ranking"

function App() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/camera" component={() => <Camera />} />
        <Route>
          <Aside open={openMenu} setOpen={setOpenMenu} />
          <div>
            <button
              onClick={() => {
                setOpenMenu(value => !value)
              }}>
              menu
            </button>
          </div>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/ranking" component={Ranking} />
            <Route path="/history" component={History} />
            <Route path="/about" component={About} />
          </Switch>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App
