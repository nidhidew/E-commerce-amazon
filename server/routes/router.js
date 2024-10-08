const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");

//get product data api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("data "+productsdata);
    return res.status(201).json(productsdata); //it will send the response of sucess and output will be in json format
  } catch (error) {
    console.log("error " + error.message);
  }
});

//get individual data
router.get("/getproductsone/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    // console.log(id);
    const individualdata = await Products.findOne({ id: pid });
    // console.log(individualdata);
    return res.status(201).json(individualdata);
  } catch (error) {
    console.log("error " + error.message);
  }
});

//get user signup data api
router.post("/register", async (req, res) => {
  // console.log(req.body);

  const { fname, email, phone, password, passwordagain } = req.body;

  if (!fname || !email || !phone || !password || !passwordagain) {
    console.log("no data available");
    return res.status(422).json({ error: "fill all data" });
  }

  try {
    const preuser = await USER.findOne({ email: email });
    if (preuser) {
      return res.status(422).json({ error: "this user is already present" });
    } else if (password != passwordagain) {
      return res
        .status(422)
        .json({ error: "password and password again not match" });
    } else {
      const finalUser = new USER({
        fname,
        email,
        phone,
        password,
        passwordagain,
      });

      const storeData = await finalUser.save();
      console.log(storeData);
      return res.status(201).json(storeData);
    }
  } catch (error) {
    console.log("error with registration ", error);
  }
});

//api for user login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill all the data" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });
    // console.log("userlogin ",userlogin);

    if (userlogin) {
      const isEmailMatch = userlogin.email;
      console.log("isEmailMatched? ", isEmailMatch);
      const isPasswordMatch = await bcrypt.compare(
        password,
        userlogin.password
      );
      console.log("isPasswordMatched? ", isPasswordMatch);

      if (!isPasswordMatch) {
        res.status(400).json({ error: "password are not matched" });
      } else if (!isEmailMatch) {
        res.status(400).json({ error: "email are not matched" });
      } else {
        //generate token
        const token = await userlogin.generateAuthtoken();
        console.log("Token ", token);
        console.log("");
        res.cookie("Amazonweb", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });
        console.log("Cookie ",req.cookies)
        res.status(201).json({ success: "password and email are matched" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "invalid details" });
  }
});

//adding the data into cart

router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    console.log("requested value ", req);
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      console.log;
      res.status(401).json({ error: "Invalid user(in try block)" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid user(in catch block)" });
  }
});

module.exports = router;
