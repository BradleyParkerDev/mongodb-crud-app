"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const registerUser_1 = __importDefault(require("./users/registerUser"));
const getUser_1 = __importDefault(require("./users/getUser"));
const updateUser_1 = __importDefault(require("./users/updateUser"));
const deleteUser_1 = __importDefault(require("./users/deleteUser"));
exports.usersController = {
    registerUser: registerUser_1.default,
    getUser: getUser_1.default,
    updateUser: updateUser_1.default,
    deleteUser: deleteUser_1.default
};
