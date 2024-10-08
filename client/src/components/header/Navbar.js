import { React, useContext } from "react";
import "./navbar.css";
import amazonlogo from "../../images/amazon_PNG25.png";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";

const Navbar = () => {

  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  return (
    <header>
      <nav>
        <div className="left">
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
          {
            account ? <Avatar className="avtar">{account.fname[0].toUpperCase()}</Avatar>:
            <Avatar className="avtar"></Avatar>
          }
            
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
