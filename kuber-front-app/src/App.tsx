import './App.css'
import PersonTable from "./PersonsTable.tsx"
import ProductsManager from "./ProductsManager.tsx"
import UserCard from "./UserCard.tsx"
import {config} from "./config.ts";


function App() {

  return (
   <div className="App">
       <h1>Person Data1</h1>
       <h2>My env {config.DESCRIPTION}</h2>
       <h2>My BASE_URL {config.BASE_URL}</h2>
       <h2>ENV {config.ENV}</h2>
       <UserCard />
       <PersonTable />
       <hr style={{ margin: '40px 0' }} />
       <ProductsManager />
   </div>
  )
}

export default App
