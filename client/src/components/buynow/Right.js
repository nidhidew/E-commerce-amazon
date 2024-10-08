import React, {useState,useEffect} from 'react'

const Right = ({item}) => {
  var [price,setPrice] = useState(0);
  useEffect(() => {
    totalAmount()
  },[item])
  const totalAmount = () =>{
    item.map((item) => {
      price += item.price.cost
    })
    setPrice(price);
  }
  return (
    <div className='right_buy'>
      <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
      <div className='cost_right'>
        <p>Your order is eligible for Free delivery</p><br></br>
        <span style={{color:"#565959"}}>Select this option at checkout. Details</span>
        <h3>Subtotal ({item.length} items): <span style={{fontWeight: 700}}>₹{price}</span></h3>
        <button className='rightbuy_btn'>Process to buy</button>
        <div className='emi'>
            EMI available
        </div>
      </div>
    </div>
  )
}

export default Right
