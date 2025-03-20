const mongoose = require("mongoose");
const {Schema} = mongoose;

const acessSchema = new Schema(
    {
        moduleName : {
            type : String,
            unique : true
        },
        active : {
            type : Boolean,
            default : true
        },
        userRole : {
            type: mongoose.Schema.ObjectId,
            ref: 'user_Roles',
            required: [true, 'Please Select a Role']
        }
    },
    {timestamps : true}
)

const Access = mongoose.model('access_module', acessSchema);

module.exports = Access;    