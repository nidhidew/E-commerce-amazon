import React, { useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { id } = useParams("");
  // console.log(id);
  const [inddata, setInddata] = useState({});
  // console.log(inddata);

  const getinddata = async () => {

    try {
      const data = await fetch(`http://localhost:8080/getproductsone/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsondata = await data.json();
      setInddata(jsondata);

      // if()
    } catch (error) {
      console.error("Error fetching data for product page:", error);
    }
  };

  useEffect(() => {
    getinddata();
  }, [id]);

  //add cart function
  const addtocart = async (id) => {
    try {
      const checkres = await fetch(`http://localhost:8080/addcart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inddata,
        }),
        credentials: "include",
      });

      const data1 = await checkres.json();
      console.log(data1 + " frontend data");

      if (checkres.status === 401 || !data1) {
        console.log("user invalid");
      } else {
        console.log("data added in your cart");
      }
    } catch (error) {
      console.error("Error fetching data for adding product in cart:", error);
    }
  };

  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src={inddata.detailUrl} alt="cart_img" />
          <div className="cart_btn">
            <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>
              Add to cart
            </button>
            <button className="cart_btn2">Buy now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>{inddata.title?.shortTitle || "Loading Title..."}</h3>
          <h4>{inddata.title?.longTitle || "Loading Title"}</h4>
          <Divider />
          <p className="mrp">₹{inddata.price?.mrp || "Loading Price..."}</p>
          <p className="">
            Deal of the Day{" "}
            <span style={{ color: "#B12704" }}>
              ₹{inddata.price?.cost || "Loading Price..."}
            </span>
          </p>
          <p className="">
            You save{" "}
            <span style={{ color: "#B12704" }}>
              ₹
              {inddata.price?.mrp - inddata.price?.cost ||
                "Loading Discount..."}{" "}
              (-{inddata.price?.discount || "Loading Percentage Discount... "})
            </span>
          </p>

          <div className="discount_box">
            <h5>
              Discount :{" "}
              <span style={{ color: "#111" }}>{inddata.discount}</span>
            </h5>
            <h4>
              Free Delivery :{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 12</span>
            </h4>
            <p>
              Fastest Delivery :{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>
                Tomorrow 11AM
              </span>
            </p>
          </div>
          <p className="description">
            About the Item :{" "}
            <span
              style={{
                color: "#565959",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.4px",
              }}
            >
              {inddata.description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
