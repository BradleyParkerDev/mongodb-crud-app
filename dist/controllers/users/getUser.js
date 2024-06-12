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
    var _a, _b;
    console.log(req.decoded);
    try {
        // Ensure req.decoded is set by the authorizeUser middleware
        const id = (_b = (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.userData) === null || _b === void 0 ? void 0 : _b.userId;
        if (!id) {
            return res.status(400).json({ message: "User ID is missing from request" });
        }
        yield (0, mongoose_1.default)();
        const foundUser = yield Users_1.default.findOne({ id: id });
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = {
            id: foundUser.id,
            emailAddress: foundUser.emailAddress,
            userName: foundUser.userName,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userImage: foundUser.userImage,
            lastUpdated: foundUser.lastUpdated
        };
        res.status(200).json({ message: "Success, user found!", user });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "User not found!", error: error.message });
    }
});
exports.default = getUser;
