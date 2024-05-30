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
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    try {
        yield (0, mongoose_1.default)();
        const foundUser = yield Users_1.default.findOne({ id: userId });
        const user = {
            id: foundUser.id,
            emailAddress: foundUser.emailAddress,
            userName: foundUser.userName,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userImage: foundUser.userImage,
            lastUpdated: foundUser.lastUpdated
        };
        res.status(200).json({ message: "Success, user found!", user: user });
    }
    catch (error) {
        res.status(500).json({ message: "User not found!", error: error });
    }
});
exports.default = getUser;
