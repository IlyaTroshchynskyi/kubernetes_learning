import './App.css'
import PersonTable from "./PersonsTable.tsx"
import {config} from "./config.ts";


function App() {

  return (
   <div className="App">
       <h1>Person Data1</h1>
       <h2>My env {config.DESCRIPTION}</h2>
       <h2>My BASE_URL {config.BASE_URL}</h2>
       <h2>ENV {config.ENV}</h2>
       <PersonTable />
   </div>
  )
}

export default App
