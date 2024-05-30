import mongoose from "mongoose";
import { uuid } from "uuidv4";

const userSchema = new mongoose.Schema({
    id: { type: String, default: uuid },
    userImage: String,
    firstName: String,
    lastName: String,
    emailAddress: { type: String, unique: true, required: true },
    userName: String,
    password: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

// Check if the model exists before compiling it
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
