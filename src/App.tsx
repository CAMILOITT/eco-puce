import { Route, Switch } from "wouter"
import "./App.css"
import Camera from "./feature/camera/Camera"
import About from "./page/About"
import Dashboard from "./page/Dashboard"
import History from "./page/History"
import Index from "./page/Index"
import NotFound from "./page/NotFound"
import Ranking from "./page/Ranking"

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/history" component={History} />
        <Route path="/about" component={About} />
        <Route path="/camera/:pin">{() => <Camera />}</Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App
