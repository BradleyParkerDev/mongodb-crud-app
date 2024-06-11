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
exports.compareUserRefreshToken = void 0;
const Users_1 = __importDefault(require("../../database/models/Users"));
const mongoose_1 = __importDefault(require("../../database/mongoose"));
const getTokenExpiration_1 = __importDefault(require("./getTokenExpiration"));
const generateUserTokens_1 = __importDefault(require("./generateUserTokens"));
const verifyRefreshToken_1 = __importDefault(require("./verifyRefreshToken"));
const hashRefreshToken_1 = __importDefault(require("../hashing/hashRefreshToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const compareUserRefreshToken = (oldRefreshToken, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.default)();
    const { decoded, userData } = yield (0, verifyRefreshToken_1.default)(oldRefreshToken);
    const id = userData.userId;
    const foundUser = yield Users_1.default.findOne({ id: userData.userId });
    if (!foundUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Check if the provided refresh token exists in the user's refreshTokens array
    const refreshTokenIndex = yield foundUser.refreshTokens.findIndex((storedHash) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt_1.default.compare(oldRefreshToken, storedHash); }));
    if (refreshTokenIndex === -1) {
        res.status(403).json({ success: false, message: 'Invalid refresh token' });
        return;
    }
    // Remove the old refresh token from the refreshTokens array
    foundUser.refreshTokens.splice(refreshTokenIndex, 1);
    // Generate new access and refresh tokens
    const { accessToken, refreshToken: newRefreshToken } = yield (0, generateUserTokens_1.default)(userData, decoded.exp);
    // Hash the new refresh token and then add it to the refreshTokens array
    try {
        const saltRounds = 5;
        const hashedRefreshToken = yield (0, hashRefreshToken_1.default)(newRefreshToken, saltRounds);
        foundUser.refreshTokens.push(hashedRefreshToken);
        yield foundUser.save();
        console.log(`New Refresh Token:  ${newRefreshToken}`);
        console.log(`Hashed Refresh Token:  ${hashedRefreshToken}`);
    }
    catch (error) {
        console.log(`Error hashing and storing new refresh token: ${error}`);
    }
    const refreshTokenExpiration = yield (0, getTokenExpiration_1.default)(newRefreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const accessTokenExpiration = yield (0, getTokenExpiration_1.default)(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    return {
        newRefreshToken,
        refreshTokenExpiration,
        accessToken,
        accessTokenExpiration
    };
});
exports.compareUserRefreshToken = compareUserRefreshToken;
exports.default = exports.compareUserRefreshToken;
