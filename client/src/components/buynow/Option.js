import React from 'react'
import { LoginContext } from '../context/ContextProvider';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Option = ({deletedata,get}) => {

  const { account, setAccount } = useContext(LoginContext);

  const removedata = async(req,res) => {
    try {
      const res = await fetch(`http://localhost:8080/remove/${deletedata}`,{
        method:"DELETE",
        headers:{
          "Accept":"application/json",
          "Content-type":"application/json"
        },
        credentials:"include"
      });

      if (res.status !== 201) {
        console.log("error");
        toast.error("Error!",{
          position: "top-center",
        })
      }else{
        console.log("user delete");
        const data = await res.json();
        console.log(data);
        setAccount(data);
        get();
        toast.success("Item removed!",{
          position: "top-center",
        })
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className='add_remove_select'>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{cursor: "pointer"}} onClick={() => removedata(deletedata)}>Delete</p><span>|</span>
      <p className='forremovemedia'>Save for Later</p><span>|</span>
      <p className='forremovemedia'>See More like this</p>
      <ToastContainer />
    </div>
  )
}

export default Option
