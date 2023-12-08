"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
/**
 * User constructor
 * User objects are passed into the database
 * constructor is called when adduser is called
 */
class User {
    _id;
    name;
    age;
    email_address;
    phone_number;
    party_history;
    settings;
    role;
    registered;
    constructor(name, age, email_address, phone_number, party_history, settings, role) {
        this._id = (0, crypto_1.randomUUID)();
        this.name = name;
        this.age = age;
        this.email_address = email_address;
        this.phone_number = phone_number;
        this.party_history = party_history;
        this.settings = settings;
        this.role = role;
        this.registered = new Date(Date.now());
    }
    toString() {
        return `User: ${this.name} (${this._id})\nAge: ${this.age}\nEmail: ${this.email_address}\nPhone: ${this.phone_number}\nParty History: ${this.party_history}\nSettings: ${this.settings}\nRole: ${this.role}\nRegistered: ${this.registered}`;
    }
    toJSONString() {
        return JSON.stringify(this);
    }
}
exports.default = User;
