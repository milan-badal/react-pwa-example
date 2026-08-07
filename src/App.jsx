import './App.css'

import ModularDashboard from './components/ModularDashboard'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import { useState } from 'react'
import viteLogo from './assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ModularDashboard />
    </>
  )
}

export default App
