import React from 'react'
import './cart.css'
import { Divider } from '@mui/material'

const Cart = () => {
  return (
    <div className='cart_section'>
      <div className='cart_container'>
        <div className='left_cart'>
            <img src='' alt='cart_img' />
            <div className='cart_btn'>
                <button className='cart_btn1'>Add to cart</button>
                <button className='cart_btn2'>Buy now</button>
            </div>
        </div>
        <div className='right_cart'>
            <h3>Fitness Gear</h3>
            <h4>jkdfjkfhjkndssssskkkkhkendfk</h4>
            <Divider />
            <p className='mrp'>MRP : ₹1195</p>
            <p className=''>Deal of the Day : <span style={{color:"#B12704"}}>₹625</span></p>
            
            <div className='discount_box'>
                <h5>Discount : <span style={{color:"#111"}} >Extra 10% off</span></h5>
                <h4>Free Delivery : <span style={{color:"#111",fontWeight:600}}></span></h4>
                <p>Fastest Delivery : <span style={{color:"#111",fontWeight:600}}>Tomorrow</span></p>
            </div>
            <p className='description'>About the Item : <span style={{color:"#565959",fontSize: 14, fontWeight:500,letterSpacing:"0.4px"}}></span></p>
        </div>
      </div>
    </div>
  )
}

export default Cart
