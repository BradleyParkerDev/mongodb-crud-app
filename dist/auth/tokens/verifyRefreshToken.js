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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jose_1 = require("jose");
const util_1 = require("util");
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Encode the secret key
        const encodedKey = new util_1.TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET_KEY);
        // Verify the token
        const { payload } = yield (0, jose_1.jwtVerify)(refreshToken, encodedKey);
        // Extract user data from the decoded payload
        const userData = {
            date: new Date(),
            userId: payload.userData.userId,
            emailAddress: payload.userData.emailAddress
        };
        return { decoded: payload, userData };
    }
    catch (error) {
        console.log(`Error verifying refresh token: ${error}`);
        return null; // Consider how you want to handle errors: return null, throw error, etc.
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
exports.default = exports.verifyRefreshToken;
