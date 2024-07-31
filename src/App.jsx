import { useState } from 'react'
import UserList from './components/UserList'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='App'>
      <Navbar/>
      <UserList/>
      </div>
    </>
  )
}

export default App
