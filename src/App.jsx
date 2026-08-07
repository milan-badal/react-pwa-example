import './App.css'

import { useEffect, useState } from 'react'

import InstallButton from './components/InstallButton'
import ModularDashboard from './components/ModularDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InstallButton />
      {/* <ModularDashboard /> */}
    </>
  )
}

export default App
