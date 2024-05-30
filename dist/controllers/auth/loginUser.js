"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../../database/models/Users"));
const mongoose_1 = __importDefault(require("../../database/mongoose"));
const auth_1 = require("../../auth");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLoginData = {
        emailAddress: req.body.emailAddress,
        password: req.body.password
    };
    // Connecting to MongoDB
    yield (0, mongoose_1.default)();
    // Finding user in database
    const foundUser = yield Users_1.default.findOne({ emailAddress: userLoginData.emailAddress });
    // If user not found
    if (!foundUser) {
        return res.status(404).json({ success: false, message: 'Could not find user.' });
    }
    // Validate password
    const passwordValid = yield auth_1.authUtil.validatePassword(userLoginData.password, foundUser.password);
    // If password not valid
    if (!passwordValid) {
        return res.status(401).json({ success: false, message: 'Password was incorrect.' });
    }
    if (passwordValid) {
        res.status(200).json({ message: "User has successfully logged in!", foundUser: foundUser });
    }
});
exports.default = loginUser;
