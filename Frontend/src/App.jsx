import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PredictDisease from './PredictDisease'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PredictDisease/>
    </>
  )
}

export default App
