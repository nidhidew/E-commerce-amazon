const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = process.env.KEY;

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Not valid email address")
            }
        }    
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    passwordagain:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ],
    carts : Array
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordagain = await bcrypt.hash(this.passwordagain, 12);
    }
    next();
})

//generate token

userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({_id:this._id},secretKey);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);        
    }
}

const USER = new mongoose.model("USER",userSchema);
module.exports=USER