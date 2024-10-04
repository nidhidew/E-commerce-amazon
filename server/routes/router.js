const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema")
const USER = require("../models/userSchema")
const bcrypt =  require("bcrypt")

//get product data api
router.get("/getproducts", async(req,res) => {
    try{
        const productsdata = await Products.find();
        // console.log("data "+productsdata);
        return res.status(201).json(productsdata) //it will send the response of sucess and output will be in json format
    }catch(error) {
        console.log("error "+error.message);
    }
})

//get individual data
router.get("/getproductsone/:pid", async(req,res) => {
    try {
        const {pid} = req.params;
        // console.log(id);
        const individualdata = await Products.findOne({id: pid});
        // console.log(individualdata);
        return res.status(201).json(individualdata)
    } catch (error) {
        console.log("error "+error.message);
    }
})

//get user signup data api
router.post("/register", async(req,res) => {
    // console.log(req.body);

    const {fname,email,phone,password,passwordagain} = req.body;

    if(!fname || !email || !phone || !password || !passwordagain){
        console.log("no data available");
        return res.status(422).json({error:"fill all data"});        
    }

    try {
        const preuser = await USER.findOne({email:email});
        if(preuser){
            return res.status(422).json({error:"this user is already present"})
        }else if(password != passwordagain){
            return res.status(422).json({error:"password and password again not match"})
        }else{
            const finalUser = new USER({
                fname,email,phone,password,passwordagain
            });

            const storeData = await finalUser.save();
            console.log(storeData);
            return res.status(201).json(storeData);
        }
    } catch (error) {
        console.log("error with registration ",error)
    }
})

//api for user login 

router.post("/login",async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({error:"fill all the data"})
    };

    try {
        const userlogin = await USER.findOne({email: email});
        console.log("userlogin ",userlogin);

        if(userlogin){
            const isEmailMatch = userlogin.email;
            console.log("isEmailMatched? ",isEmailMatch);
            const isPasswordMatch =  await bcrypt.compare(password,userlogin.password);
            console.log("isPasswordMatched? ",isPasswordMatch);
            
            //generate token
            const token = await userlogin.generateAuthtoken();
            console.log(token);
            
            res.cookie("Amazonweb",token,{
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            })

            if(!isPasswordMatch){
                res.status(400).json({error:"password are not matched"})
            }else if(!isEmailMatch){
                res.status(400).json({error:"email are not matched"})
            }else{
                res.status(201).json({success:"password and email are matched"})
            }
        }
    } catch (error) {
        res.status(400).json({error: "invalid details"})
    }
})
module.exports = router;