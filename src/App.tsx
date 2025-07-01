import { Route, Switch } from "wouter"
import "./App.css"
import Dashboard from "./page/Dashboard"
import Index from "./page/Index"

const title = "EcoPUCE @- Reciclaje de botellas PET en la PUCE"

console.log(title)

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users/:name">
          {params => <>Hello, {params.name}!</>}
        </Route>
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
