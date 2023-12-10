"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Construct the name object for User objects
 * holds first name and last name in separate fields for simplicity
 */
class Name {
    first;
    last;
    constructor(first, last) {
        this.first = first;
        this.last = last;
    }
    toString() {
        return `${this.first} ${this.last}`;
    }
}
exports.default = Name;
