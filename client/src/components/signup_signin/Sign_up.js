import React, { useState } from 'react'
import './signup.css'
import amazonlogo from '../../images/blacklogoamazon.png'
import { NavLink } from 'react-router-dom'

const Sign_up = () => {

  const [udata,setUdata] = useState({
    fname:"",
    email:"",
    phone:"",
    password:"",
    passwordagain:""
  });
  console.log(udata);
  
  const addUdata = (e) => {
    const {name,value} = e.target;

    setUdata(() => {
      return{
        ...udata,
        [name]:value
      }
    })
  }

  return (
    <>
    <section>
      <div className='sign_container'>
        <div className='sign_header'>
          <img src={amazonlogo} alt="amazonlogo" />
        </div>
        <div className='sign_form'>
          <form>
            <h1>Sign Up</h1>
            <div className='form-data'>
              <label htmlFor="fname">Your name</label>
              <input type="text" name="fname" id="fname" 
              onChange={addUdata} value={udata.fname}/>
            </div>
            <div className='form-data'>
              <label htmlFor="email">email</label>
              <input type="text" name="email" id="email" 
              onChange={addUdata} value={udata.email}/>
            </div>
            <div className='form-data'>
              <label htmlFor="phone">Mobile number</label>
              <input type="text" name="phone" id="phone" 
              onChange={addUdata} value={udata.phone}/>
            </div>
            <div className='form-data'>
              <label htmlFor="password">Password</label>
              <input type="text" name="password" id="password" 
              onChange={addUdata} value={udata.password}/>
            </div>
            <div className='form-data'>
              <label htmlFor="passwrodagain">Password again</label>
              <input type="text" name="passwordagain" id="passwordagain" 
              onChange={addUdata} value={udata.passwordagain}/>
            </div>
            
            <button className='signin_btn'>Continue</button>
            <div className='signin_info'>
              <p>Already have an account ?</p>
              <NavLink to="/signin">Sign IN</NavLink>
            </div>
          </form>
        </div>
       
      </div>
    </section>
  </>
  )
}

export default Sign_up
