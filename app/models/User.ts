import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI!)
mongoose.Promise = global.Promise

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
}, {
    timestamps: true
})

// firt value is defined. If no, it will create one
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;