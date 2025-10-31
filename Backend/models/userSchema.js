const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,select:false,minLength:[4,"Password must be at least 4 characters."]},
    // Profile fields - added for profile page
    phone:{type:String,default:""},
    country:{type:String,default:""},
    education:{type:String,default:""},
    profilePhoto:{type:String,default:""},
    // Additional profile fields
    bio:{type:String,default:"",maxLength:[500,"Bio must be less than 500 characters"]},
    occupation:{type:String,default:""},
    dateOfBirth:{type:String,default:""}
})  

const User = mongoose.model("User", userSchema);

module.exports = User;