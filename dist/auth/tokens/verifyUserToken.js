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
// Remove: const { TextEncoder } = require('util');
const jose_1 = require("jose");
const verifyUserToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        console.error('No token provided');
        return null;
    }
    try {
        const secretAccessKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY);
        const { payload } = yield (0, jose_1.jwtVerify)(token, secretAccessKey, {
            algorithms: ['HS256']
        });
        // console.log('Token verified with ACCESS_TOKEN_SECRET_KEY:', payload);
        return payload;
    }
    catch (accessTokenError) {
        // console.error('Token verification failed with ACCESS_TOKEN_SECRET_KEY:', accessTokenError.message);
    }
    try {
        const secretRefreshKey = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET_KEY);
        const { payload } = yield (0, jose_1.jwtVerify)(token, secretRefreshKey, {
            algorithms: ['HS256']
        });
        // console.log('Token verified with REFRESH_TOKEN_SECRET_KEY:', payload);
        return payload;
    }
    catch (refreshTokenError) {
        // console.error('Token verification failed with REFRESH_TOKEN_SECRET_KEY:', refreshTokenError.message);
    }
    return null;
});
module.exports = verifyUserToken;
