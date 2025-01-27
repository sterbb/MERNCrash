import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },email:{
        type: String,
        required: true,
        unique: true
    },password:{
        type:String,
        required:true
    }
}, {timestamps:true});

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    // before the save -hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

});

//compare password (matchPasswords  is manual)
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);



export default User;