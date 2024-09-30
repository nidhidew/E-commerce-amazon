const ProductsSchema = require("./models/productsSchema");
const productsData = require("./constant/productsdata");

const DefaultData = async() => {
    try{
        // await ProductsSchema.deleteMany({})
        const storeData = await ProductsSchema.insertMany(productsData)
        console.log(storeData); 
    }catch (error) {
        console.log("error "+error.message);

    }
};

module.exports = DefaultData;