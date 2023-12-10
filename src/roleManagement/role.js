"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * if Role is "Host", initialize HostInformation, else don't define it
 * Constuctor is called whenever a User object is intialized
 */
class Role {
    role;
    hostInformation;
    constructor(role, hostInformation) {
        this.role = role;
        this.hostInformation = hostInformation;
    }
}
exports.default = Role;
