"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const database_js_1 = require("../database.js");
async function deleteUser(_id) {
    (0, database_js_1.initializeClient)();
    await database_js_1.usersDB.command({ ping: 1 });
    /*
     * Copy the user with the specified _id to the preDeletionUsers collection
     * Keep in mind that findOne() will return Promise<WithId<User> | null>,
     * so even after awaiting the call, the result may be unassignable to a User variable, since it is not guaranteed to be a User
     * Therefore, we must cast the result to a User
     */
    const user = await database_js_1.users.findOne({ _id: _id });
    await database_js_1.preDeletionUsers.insertOne(user);
    /*
    adds a 30 day timer before the selected User document expires from cache database
    updates preDeletionUsers collection
    */
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 30);
    await database_js_1.preDeletionUsers.updateOne({ _id: _id }, { $set: { expiresAfter: date } }, { upsert: true });
    /*
    Deletes user with specified _id from "User Data" Collection
    close connection
    */
    await database_js_1.users.deleteOne({ _id: _id });
    await (0, database_js_1.closeClient)();
}
exports.deleteUser = deleteUser;
