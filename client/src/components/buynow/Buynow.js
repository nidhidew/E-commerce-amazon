import React, { useEffect, useState } from "react";
import "./buynow.css";
import { Divider } from "@mui/material";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";

const Buynow = () => {
  const [cartdata, setCartdata] = useState("");
  console.log(cartdata);

  const getDataBuy = async () => {
    const res = await fetch(`http://localhost:8080/cartdetails`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getDataBuy();
  }, []);

  return (
    <>
      {cartdata.length > 0 ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">cartdata.price.cost</span>
              <Divider />
              {cartdata.map((e, k) => {
                return (
                  <>
                  <div className="item_containert">
                    <img src={e.detailUrl} alt=""></img>
                    <div className="item_details">
                      <h3>{e.title.longTitle}</h3>
                      <h3>{e.title.shortTitle}</h3>
                      <h3 className="diffrentprice">₹{e.price.cost}</h3>
                      <p className="unusuall">usually dispatched in 8 days</p>
                      <p>Eligible for free shipping</p>
                      <img
                        src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                        alt=""
                      />
                      <Option />
                    </div>
                    <h3 className="item_price">₹{e.price.cost}</h3>
                  </div>
                  <Divider />
                  </>
                );
              })}
              <Subtotal item={cartdata} />
            </div>
            <Right item={cartdata}/>
          </div>
        </div>
      ) : (
        <div className="buynow_section">
          <div className="buynow_container">
            <h1>Empty Cart</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Buynow;
