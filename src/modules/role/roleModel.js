const mongoose = require("mongoose");
const {Schema} = mongoose;

const roleSchema = new Schema(
    {
        roleName : {
            type : String,
            unique : true
            // default : 'user',
            // enum : ['user', 'admin']
        }
    },
    {timestamps : true}
)

const UserRole = mongoose.model('user_Roles', roleSchema);

module.exports = UserRole;