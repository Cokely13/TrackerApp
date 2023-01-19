import React from 'react'
import 'bootstrap'
import Navbar from './components/Navbar'
import Routes from './Routes'
// import './index.css'


const App = () => {
  return (
    <div className="bg-success p-2 text-dark bg-opacity-10"
     >
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
