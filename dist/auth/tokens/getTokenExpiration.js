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
exports.getTokenExpiration = void 0;
const jose_1 = require("jose");
const getTokenExpiration = (token, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Encode the secret key
        const encodedKey = new TextEncoder().encode(secretKey);
        // Verify the token and extract the payload
        const { payload } = yield (0, jose_1.jwtVerify)(token, encodedKey);
        // Return the expiration date as a Date object
        if (payload.exp) {
            return new Date(payload.exp * 1000);
        }
        return null; // Return null if exp is not found in payload
    }
    catch (error) {
        console.log('Failed to decode token.');
        console.log(`Error: ${error}`);
        return null; // Return null or throw an error as needed
    }
});
exports.getTokenExpiration = getTokenExpiration;
exports.default = exports.getTokenExpiration;
