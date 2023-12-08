"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeClient = exports.initializeClient = exports.MONGO_USER_PASSWORD = exports.MONGO_USER = exports.preDeletionUsers = exports.users = exports.usersDB = exports.client = void 0;
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
(0, dotenv_1.config)();
/**
 * exports user database
 */
const 
/**
 * init Mongo Client and all other variables
 * called every time an action is performed on the database (ie all CRUD operations)
 */
initializeClient = () => {
    /*
    create new MongoClient and connect to the database
    uses environment variables to connect
    */
    exports.client = new mongodb_1.MongoClient(`mongodb+srv://${exports.MONGO_USER}:${exports.MONGO_USER_PASSWORD}@atlascluster.bvzvel0.mongodb.net/?retryWrites=true&w=majority`, {
        serverApi: {
            deprecationErrors: true,
            strict: true,
            version: mongodb_1.ServerApiVersion.v1
        }
    });
    /*
    gets "Users" database using MongoClient variable
    */
    exports.usersDB = exports.client.db("Users");
    /*
    retrieves "User Data" document collection from "Users" database
    */
    exports.users = exports.usersDB.collection("User Data");
    /*
    gets "Pre-Deletion" document collection
    used as a cache before user accounts before deletion period is over
    */
    exports.preDeletionUsers = exports.usersDB.collection("Pre-Deletion");
}, 
/**
 * @returns the client.close() method under the alias of closeClient
 */
closeClient = () => exports.client.close();
_a = process.env, exports.MONGO_USER = _a.MONGO_USER, exports.MONGO_USER_PASSWORD = _a.MONGO_USER_PASSWORD, 
/**
 * init Mongo Client and all other variables
 * called every time an action is performed on the database (ie all CRUD operations)
 */
exports.initializeClient = initializeClient, 
/**
 * @returns the client.close() method under the alias of closeClient
 */
exports.closeClient = closeClient;
