const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    //Generate Auth Token
    getAuthToken : async(data) =>{
        return jwt.sign({data}, process.env.JWT_SECRET, {expiresIn : '24h'});
    },

    //Decode Auth Token
    decodeAuthToken : async(token) =>{
        if(token){
            try{
                return jwt.verify(token, process.env.JWT_SECRET);
            }catch(error){
                return false;
            }
        }
        return false;
    
    }
}