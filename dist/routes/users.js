"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
const auth_1 = require("../auth");
router.post('/register-user', controllers_1.usersController.registerUser);
// routes using middleware
router.get('/get-user', auth_1.authUtil.authorizeUser, controllers_1.usersController.getUser);
router.put('/update-user', auth_1.authUtil.authorizeUser, controllers_1.usersController.updateUser);
router.delete('/delete-user', auth_1.authUtil.authorizeUser, controllers_1.usersController.deleteUser);
exports.default = router;
