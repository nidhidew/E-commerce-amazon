import React, { useState } from 'react'
import './signup.css'
import amazonlogo from '../../images/blacklogoamazon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom'

const Sign_up = () => {

  const [udata,setUdata] = useState({
    fname:"",
    email:"",
    phone:"",
    password:"",
    passwordagain:""
  });
  
  const addUdata = (e) => {
    const {name,value} = e.target;

    setUdata(() => {
      return{
        ...udata,
        [name]:value
      }
    })
  }

  const sendData = async(e) => {
    e.preventDefault();
    const { fname, email, phone, password, passwordagain } = udata;
    const jsondatareg = JSON.stringify({
      fname, email, phone, password, passwordagain
    })
    console.log(jsondatareg);
    if(fname === ""){
      toast.error("Please give Your name !",{
        position: "top-center"
      })
    } else if(email === ""){
      toast.error("Please give Your email id !",{
        position: "top-center"
      })
    } else if(phone === ""){
      toast.error("Please give Your mobile number !",{
        position: "top-center"
      })
    } else if(password === ""){
      toast.error("Please write your password !",{
        position: "top-center"
      })
    } else if(passwordagain === ""){
      toast.error("Please write your confirm password !",{
        position: "top-center"
      })
    } else {
      
    }
    
    const data = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsondatareg
    });

    const res = await data.json();
    console.log(res);

    if(data.status === 422 || !data){
      toast.error("No Data added !",{
        position: "top-center",
      })
    }else{
      toast.success("Data added successfully !",{
        position: "top-center",
      })
      setUdata({...udata,fname:"",email:"",phone:"",password:"",passwordagain:""})
    }
  }

  return (
    <>
    <section>
      <div className='sign_container'>
        <div className='sign_header'>
          <img src={amazonlogo} alt="amazonlogo" />
        </div>
        <div className='sign_form'>
          <form method='POST'>
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
            
            <button className='signin_btn' onClick={sendData}>Continue</button>
            <div className='signin_info'>
              <p>Already have an account ?</p>
              <NavLink to="/signin">Sign IN</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  </>
  )
}

export default Sign_up
