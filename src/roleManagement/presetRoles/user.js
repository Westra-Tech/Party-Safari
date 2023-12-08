"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_js_1 = __importDefault(require("../role.js"));
const roleType_js_1 = require("../roleType.js");
class UserRole extends role_js_1.default {
    constructor() {
        super(roleType_js_1.RoleType.USER);
    }
}
exports.default = UserRole;
