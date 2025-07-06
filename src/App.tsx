import { Route, Switch } from "wouter"
import "./App.css"
import Camera from "./feature/camera/Camera"
import Dashboard from "./page/Dashboard"
import Index from "./page/Index"
import Ranking from "./page/Ranking"

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/users/:name">
          {params => <>Hello, {params.name}!</>}
        </Route>
        <Route path="/camera/:pin">{params => <Camera />}</Route>
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
