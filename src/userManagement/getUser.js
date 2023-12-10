"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const database_js_1 = require("../database.js");
/**
 * @param _id the uuid of the User object to get, or null if user not found
 * @returns specified user
 */
async function getUser(_id) {
    /*
    init connection, find and return user, and close connection
    */
    (0, database_js_1.initializeClient)();
    const user = await database_js_1.users.findOne({ _id: _id });
    await (0, database_js_1.closeClient)();
    return user;
}
exports.getUser = getUser;
