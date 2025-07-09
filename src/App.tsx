import { IconMenuDeep } from "@tabler/icons-react"
import { Suspense, useState } from "react"
import { Route, Switch } from "wouter"
import "./App.css"
import ProtectedRoute from "./auth/ProtectedRoute"
import Aside from "./components/aside/Aside"
import Camera from "./feature/camera/Camera"
import Dashboard from "./page/Dashboard"
import History from "./page/History"
import Index from "./page/Index"
import NotFound from "./page/NotFound"
import Ranking from "./page/Ranking"
import { auth } from "./service/google/config"
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
          <ProtectedRoute>
            <>
              <Aside open={openMenu} setOpen={setOpenMenu} />
              <div>
                <button
                  onClick={() => {
                    setOpenMenu(value => !value)
                  }}>
                  <IconMenuDeep />
                </button>
              </div>
              <Route
                path="/dashboard"
                component={() => (
                  <Suspense>
                    <Dashboard
                      fetchUserPosition={getUserPosition(auth.currentUser?.uid)}
                    />
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
                    <History
                      historyPromise={getHistory(auth.currentUser?.uid)}
                    />
                  </Suspense>
                )}
              />
            </>
          </ProtectedRoute>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App
