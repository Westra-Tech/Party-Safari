"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const database_js_1 = require("../database.js");
/**
 *
 * @param _id uuid
 * @param name name of user
 * @param age age of user
 * @param email_address user email
 * @param phone_number phone number
 * @param party_history previous parties attended, specified by party ids
 * @param settings user settings, i.e., enable/disable notifications
 * @param role ie, user or host
 * @returns updated
 */
async function updateUser(_id, name, age, email_address, phone_number, party_history, settings, role) {
    (0, database_js_1.initializeClient)();
    await database_js_1.usersDB.command({ ping: 1 });
    const updateFields = {};
    if (name !== undefined)
        updateFields.name = name;
    if (age !== undefined)
        updateFields.age = age;
    if (email_address !== undefined)
        updateFields.email_address = email_address;
    if (phone_number !== undefined)
        updateFields.phone_number = phone_number;
    if (party_history !== undefined)
        updateFields.party_history = party_history;
    if (settings !== undefined)
        updateFields.settings = settings;
    if (role !== undefined)
        updateFields.role = role;
    /*
    Update the user with the specified _id with the specified fields
    */
    const update = await database_js_1.users.updateOne({ _id: _id }, { $set: updateFields });
    await (0, database_js_1.closeClient)();
    return update;
}
exports.updateUser = updateUser;
