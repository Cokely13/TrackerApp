import React from 'react'
import 'bootstrap'
import Navbar from './components/Navbar'
import Routes from './Routes'


const App = () => {
  return (
    <div className="p-3 mb-2 bg-dark-subtle text-emphasis-dark">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
