import { React, useContext, useEffect, useState } from "react";
import "./navbar.css";
import amazonlogo from "../../images/amazon_PNG25.png";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  const history = useNavigate();
  const [dropen, setDropen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getdetailvaliduser = async () => {
    const res = await fetch("http://localhost:8080/validateuser", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    // Check if response is OK before parsing as JSON
    if (!res.ok) {
      console.error(`Server error: ${res.status}`);
    } else {
      const data = await res.json();
      console.log("getdetailuser data", data);
      setAccount(data);
    }
  };

  const handleopen = () => {
    setDropen(true);
  };

  const handleclose = () => {
    setDropen(false);
  };

  const logoutuser = async () => {
    const res = await fetch("http://localhost:8080/logout", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    // Check if response is OK before parsing as JSON
    if (!res.ok) {
      console.error(`Server error: ${res.status}`);
    } else {
      toast.success("Logged out",{
        position: "top-center",
      })
      setAccount(false);
      history("/")
    }
  };

  const handleClickonLogout = () => {
    logoutuser();
    handleclose();
  }

  useEffect(() => {
    getdetailvaliduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handleclose}>
            <Rightheader Logclose={handleclose} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src={amazonlogo} alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>

        <div className="right">
          <div className="nav_btn">
            <NavLink to="/signin">signin</NavLink>
          </div>

          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts?.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/buynow">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
          </div>
          <div>
            {account ? (
              <Avatar className="avtar2" id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}>
                {account.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar className="avtar" id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}></Avatar>
            )}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              
              <MenuItem onClick={handleClose}>My account</MenuItem>
              {
                account ? <MenuItem onClick={handleClickonLogout}><LogoutIcon style={{fontSize:"16px",marginRight:"3px"}}/>Logout</MenuItem> : ""
              }
            </Menu>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
