import React from 'react'
import Navbar from './components/header/Navbar'
import Newnav from './components/newnavbaar/Newnav'
import Maincomponent from './components/home/Maincomponent'
import Footer from './components/footer/Footer'
import Sign_up from './components/signup_signin/Sign_up'
import Sign_in from './components/signup_signin/Sign_in'
import {Route,Routes} from "react-router-dom"
import Cart from './components/cart/Cart'
import Buynow from './components/buynow/Buynow'


const App = () => {
  return (
    <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path="/" element={<Maincomponent />} />
        <Route path="/signin" element={<Sign_in />} />
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
