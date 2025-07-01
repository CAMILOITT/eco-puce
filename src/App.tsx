import { Route, Switch } from "wouter"
import "./App.css"
import Dashboard from "./page/Dashboard"
import Index from "./page/Index"
import Camera from "./feature/camera/Camera"

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users/:name">
          {params => <>Hello, {params.name}!</>}
        </Route>
        
        <Route path="/camera/:pin">
          {params => <Camera/>}
        </Route>
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
