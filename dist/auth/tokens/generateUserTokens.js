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
exports.generateUserTokens = void 0;
const jose_1 = require("jose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const generateUserTokens = (userData, oldRefreshTokenExp) => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate expiration time for the new refresh token
    let refreshTokenExp;
    if (oldRefreshTokenExp) {
        // Use the remaining time in seconds for old refresh token as the duration
        refreshTokenExp = `${Math.floor((oldRefreshTokenExp - Date.now() / 1000) / 60)}m`;
    }
    else {
        // Set expiration time to 7 days if old refresh token expiration is not present
        refreshTokenExp = '7d'; // 7 days
    }
    const accessTokenExp = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
    // Prepare keys
    const accessTokenSecretKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY);
    const refreshTokenSecretKey = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET_KEY);
    // Prepare payloads and set headers
    const accessTokenPayload = {
        userData,
        type: 'access'
    };
    const refreshTokenPayload = {
        userData,
        type: 'refresh'
    };
    // Generate Access Token with 15 minutes expiration
    const accessToken = yield new jose_1.SignJWT(accessTokenPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(accessTokenExp) // 15 minutes
        .sign(accessTokenSecretKey);
    // Generate Refresh Token with dynamic expiration based on oldRefreshTokenExp
    const refreshToken = yield new jose_1.SignJWT(refreshTokenPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(refreshTokenExp)
        .sign(refreshTokenSecretKey);
    return { accessToken, refreshToken };
});
exports.generateUserTokens = generateUserTokens;
exports.default = exports.generateUserTokens;
