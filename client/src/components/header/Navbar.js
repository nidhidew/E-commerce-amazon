import React from 'react'
import "./navbar.css"
import amazonlogo from "../../images/amazon_PNG25.png"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <nav>
            <div className='left'>
              <div className='navlogo'>
                <NavLink to="/"><img src={amazonlogo} alt="" /></NavLink>
              </div>
              <div className='nav_searchbaar'>
                <input type='text' name='' id='' />
                <div className='search_icon'>
                  <SearchIcon  id="search"/>
                </div>
              </div>
            </div>
                
            <div className='right'>
              <div className='nav_btn'>
                <NavLink to="/signin">signin</NavLink>
              </div>
              <div className='cart_btn'>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartIcon id="icon" />
              </Badge>
              <NavLink to="/buynow">Cart</NavLink>
              </div>
              <div>
                <Avatar className='avtar' />
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
