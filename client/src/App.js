import React from 'react'
import Navbar from './components/header/Navbar'
import Newnav from './components/newnavbaar/Newnav'
import Maincomponent from './components/home/Maincomponent'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <Newnav />
      <Maincomponent />
      <Footer />
    </>
  )
}

export default App
