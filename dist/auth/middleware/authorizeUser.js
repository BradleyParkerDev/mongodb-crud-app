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
const verifyAccessToken_1 = __importDefault(require("../accessToken/verifyAccessToken"));
const authorizeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Middleware!');
    try {
        const bearerToken = req.headers['authorization'];
        if (bearerToken) {
            const accessToken = bearerToken.split(' ')[1];
            const decoded = yield (0, verifyAccessToken_1.default)(accessToken);
            // console.log(decoded)
            if (!decoded) {
                console.error('Invalid Token');
                return res.status(401).json({ message: 'Invalid Token' });
            }
            // // Attach decoded user data to request object
            req.decoded = decoded;
            next(); // Proceed to the next middleware
        }
        else {
            console.error('Missing Token');
            return res.status(401).json({ message: 'Missing Token' });
        }
    }
    catch (error) {
        console.error('Authorization error:', error.message);
        return res.status(401).json({ message: error.message });
    }
});
exports.default = authorizeUser;
