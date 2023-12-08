"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleType = void 0;
/**
 * Types of Users: See business description for permissions
 * In database, all roles map to an integer
 */
var RoleType;
(function (RoleType) {
    RoleType[RoleType["ADMIN"] = 0] = "ADMIN";
    RoleType[RoleType["HOST"] = 1] = "HOST";
    RoleType[RoleType["USER"] = 2] = "USER";
})(RoleType || (exports.RoleType = RoleType = {}));
