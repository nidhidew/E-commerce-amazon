import React, { useState, useContext } from 'react'
import './signup.css'
import amazonlogo from '../../images/blacklogoamazon.png'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Sign_in = () => {

  const [logdata,setData] = useState({
    email:  "",
    password: ""
  })
  const { account, setAccount } = useContext(LoginContext);

  const addData = (e) => {
    const { name,value } = e.target;
    
    setData(() => {
      return {
        ...logdata,
        [name]:value
      }
    })
  }

  const sendData = async(e) => {
    e.preventDefault();
    const { email, password } = logdata;
    const jsondatalogin = JSON.stringify({
      email, password
    })
   if(email === ""){
      toast.error("Please give Your email id !",{
        position: "top-center"
      })
    } else if(password === ""){
      toast.error("Please write your password !",{
        position: "top-center"
      })
    } else {
      window.location.href = "http://localhost:3000/"
    }
    
    const data = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsondatalogin,
      credentials: 'include'
    });

    const res = await data.json();
    console.log(res);

    if(data.status === 422 || !data){
      toast.error("No Data added !",{
        position: "top-center",
      })
    }else{
      setAccount(data)
      toast.success("Logged IN !",{
        position: "top-center",
      })
      setData({...logdata,email:"",password:""})
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
              <h1>Sign In</h1>
              <div className='form-data'>
                <label htmlFor="email">Email</label>
                <input type="text" 
                onChange={addData} 
                value={logdata.email}
                name="email" 
                id="email" 
                 />
              </div>
              <div className='form-data'>
                <label htmlFor="password">Password</label>
                <input type="password" 
                name="password" 
                onChange={addData} 
                value={logdata.password}
                placeholder='6 character' 
                id="password" 
                 />
              </div>
              <button className='signin_btn' onClick={sendData}>Continue</button>
            </form>
            <ToastContainer />
          </div>
          <div className='create_accountinfo'>
            <p>New To Amazon</p>
            <NavLink to="/signup"><button>Create your Amazon Account</button></NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sign_in
