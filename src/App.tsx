import { Suspense, useState } from "react"
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
import {
  getHistory,
  getRanking,
  getUserPosition,
} from "./service/google/db/reciclar"

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
            <Route
              path="/dashboard"
              component={() => (
                <Suspense>
                  <Dashboard fetchUserPosition={getUserPosition("userId")} />
                </Suspense>
              )}
            />
            <Route
              path="/ranking"
              component={() => (
                <Suspense>
                  <Ranking fetchRanking={getRanking(10)} />
                </Suspense>
              )}
            />
            <Route
              path="/history"
              component={() => (
                <Suspense fallback={<div>...cargando</div>}>
                  <History historyPromise={getHistory("userId")} />
                </Suspense>
              )}
            />
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
