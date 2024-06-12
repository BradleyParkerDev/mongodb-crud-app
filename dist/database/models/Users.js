"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuidv4_1 = require("uuidv4");
const userSchema = new mongoose_1.default.Schema({
    id: { type: String, default: uuidv4_1.uuid },
    userImage: String,
    firstName: String,
    lastName: String,
    emailAddress: { type: String, unique: true, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});
// Check if the model exists before compiling it
const User = mongoose_1.default.models.users || mongoose_1.default.model('users', userSchema);
exports.default = User;
