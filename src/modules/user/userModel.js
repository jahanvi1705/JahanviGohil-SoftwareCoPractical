const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        firstname : {
            type : String,
        },
        lastname : {
            type : String,
        },
        username : {
            type : String,
            unique : true,
        },
        email : {
            type : String,
            unique : true
        },
        password : {
            type : String
        },
        userRole : {
            type: mongoose.Schema.ObjectId,
            ref: 'user_Roles',
            required: [true, 'Please Select a Role']
        }
    },
    {timestamps : true}
)

const User = mongoose.model('user', userSchema);

module.exports = User;