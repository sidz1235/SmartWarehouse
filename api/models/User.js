import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:{type:String,unique:true},
    password:{type:String},
    userType:{type:String},
    company:{type:String,},
    token:{
        type:String
    },
});

const User = mongoose.model('User',UserSchema);

export { User };