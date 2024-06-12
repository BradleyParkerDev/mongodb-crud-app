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
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Ensure req.decoded is set by the authorizeUser middleware
        const id = (_b = (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.userData) === null || _b === void 0 ? void 0 : _b.userId;
        if (!id) {
            return res.status(400).json({ message: "User ID is missing from request" });
        }
        // connects to database
        yield (0, mongoose_1.default)();
        const userToUpdate = req.body;
        // hash password if in req.body
        if (userToUpdate.password) {
            const saltRounds = 5;
            const passwordHash = yield auth_1.authUtil.generatePasswordHash(req.body.password, saltRounds);
            userToUpdate.password = passwordHash;
        }
        const response = yield Users_1.default.updateOne({ id: id }, userToUpdate);
        if (response.matchedCount === 0) {
            return res.json({ message: "User not found, could not update user.", response: response });
        }
        res.json({ message: "Successfully updated user!", response: response });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error updating user", error });
    }
});
exports.default = updateUser;
