"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const database_js_1 = require("../database.js");
/**
 * @param user
 * @returns insert: json object of boolean acknowledge, string uuid
 * acknowledge is true if the add user request was successful
 * uuid is the internal id of the added user
 */
async function addUser(user) {
    (0, database_js_1.initializeClient)();
    /*
    ping database to see if connection is valid
    insert user and close connection
    */
    await database_js_1.usersDB.command({ ping: 1 });
    const insert = await database_js_1.users.insertOne(user);
    await (0, database_js_1.closeClient)();
    return insert;
}
exports.addUser = addUser;
