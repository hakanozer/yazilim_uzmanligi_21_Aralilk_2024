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
exports.profileUpdate = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userService_1 = require("./userService");
const cryptoJS_1 = require("../utils/cryptoJS");
const profileUpdate = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const oldUser = req.session.item;
    if ((0, userService_1.emailValid)(email)) {
        oldUser.name = name;
        oldUser.email = email;
        try {
            yield userModel_1.default.updateOne({ _id: oldUser._id }, {
                $set: {
                    name: name,
                    email: email
                }
            });
            req.session.item = oldUser;
            return true;
        }
        catch (error) {
            return false;
        }
    }
    if (password && confirmPassword && password === confirmPassword) {
        const encryptedPassword = (0, cryptoJS_1.encrypt)(password);
        try {
            yield userModel_1.default.updateOne({ _id: oldUser._id }, {
                $set: {
                    password: encryptedPassword
                }
            });
            oldUser.password = encryptedPassword;
            req.session.item = oldUser;
            return true;
        }
        catch (error) {
            return false;
        }
    }
    return false;
});
exports.profileUpdate = profileUpdate;
//# sourceMappingURL=profileService.js.map