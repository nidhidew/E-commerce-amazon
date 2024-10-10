import React from "react";
import './rightheader.css'
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";

const Rightheader = ({Logclose}) => {
  const { account, setAccount } = useContext(LoginContext);
  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {
            account ? ( <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>) : ( <Avatar className="avtar"></Avatar>)
          }
          {
            account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""
          }
        </div>
        <div className="nav_btn" onClick={()=>Logclose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop by category</NavLink>
          <Divider style={{width:"100%",marginLeft:"-20px"}}/>
          <NavLink to="/">Today's deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your order</NavLink>
          ) : (
            <NavLink to="/signin">Sign In</NavLink>
          )}
          <Divider style={{width:"100%",marginLeft:"-20px"}}/>
          <div className="flag">
            <NavLink to="/">Settings</NavLink>
          </div>

          {/* <NavLink to="/signin">Sign in</NavLink> */}
        </div>
      </div>
    </>
  );
};

export default Rightheader;
