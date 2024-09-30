const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema")

//get product data api
router.get("/getproducts", async(req,res) => {
    try{
        const productsdata = await Products.find();
        // console.log("data "+productsdata);
        res.status(201).json(productsdata) //it will send the response of sucess and output will be in json format
    }catch(error) {
        console.log("error "+error.message);
    }
})

//get individual data
router.get("/getproductsone/:id", async(req,res) => {
    try {
        const {pid} = req.params;
        // console.log(id);
        const individualdata = await Products.findOne({id: pid});
        // console.log(individualdata);
        res.status(201).json(individualdata)
    } catch (error) {
        console.log("error "+error.message);
    }
})

module.exports = router;