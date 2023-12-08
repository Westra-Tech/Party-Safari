"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const https = __importStar(require("node:https"));
const user_js_1 = __importDefault(
  require("./roleManagement/presetRoles/user.js")
);
const addUser_js_1 = require("./userManagement/addUser.js");
const deleteUser_js_1 = require("./userManagement/deleteUser.js");
const getUser_js_1 = require("./userManagement/getUser.js");
const updateUser_js_1 = require("./userManagement/updateUser.js");
const user_js_2 = __importDefault(require("./userManagement/user.js"));
// const url = "http://localhost:8000";
class Server {
  PORT;
  HOST;
  server;
  data;
  constructor(port, host) {
    this.PORT = port;
    this.HOST = host;
  }
  create() {
    console.log("test1");
    this.server = https.createServer(async (req, res) => {
      let data = "";
      req.on("data", (chunk) => (data = chunk));
      // if the url is null, undefined, or empty, change the url to "/"
      if (!req.url) req.url = "/";
      let parsedData;
      req.on("end", async () => {
        switch (
          req.method //make sure the body is json
        ) {
          case "POST":
            if (req.headers["content-type"] !== "application/json") {
              httpError(res, 415, "Unsupported Media Type");
              return;
            }
            parsedData = JSON.parse(data);
            await (0, addUser_js_1.addUser)(
              new user_js_2.default(
                parsedData.name,
                parsedData.age,
                parsedData.email_address,
                parsedData.phone_number,
                parsedData.party_history,
                parsedData.settings,
                parsedData.role
              )
            );
            res.writeHead(200, "OK");
            res.end();
            break;
          case "GET":
            if (req.headers["content-type"] !== "text/plain") {
              httpError(res, 415, "Unsupported Media Type");
              return;
            }
            res.writeHead(200, "OK");
            let getID = req.url;
            getID = getID.slice(-36);
            res.end((await (0, getUser_js_1.getUser)(getID)).toString());
            break;
          case "PATCH":
            if (req.headers["content-type"] !== "application/json") {
              httpError(res, 415, "Unsupported Media Type");
              return;
            }
            parsedData = JSON.parse(data);
            await (0, updateUser_js_1.updateUser)(
              parsedData._id,
              parsedData.name,
              parsedData.age,
              parsedData.email_address,
              parsedData.phone_number,
              parsedData.party_history,
              parsedData.settings,
              parsedData.role
            );
            res.writeHead(200, "OK");
            res.end();
            break;
          case "DELETE":
            if (req.headers["content-type"] !== "text/plain") {
              httpError(res, 415, "Unsupported Media Type");
              return;
            }
            res.writeHead(200, "OK");
            res.end(await (0, deleteUser_js_1.deleteUser)(`${data}`));
            break;
          default:
            httpError(res, 405, "Method not allowed");
            break;
        }
      });
    });
    this.server.listen(8000, () =>
      console.log(`Server is running on http://${this.HOST}:${this.PORT}`)
    );
  }
  async userLogin() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      name: "Adrian Jackson",
      age: 25,
      email_address: "mike@example.net",
      phone_number: "1234567890",
      party_history: [],
      settings: {
        notifications: {
          enabled: {
            enabled_hosts: [],
            global: true,
          },
          user_notifications: [],
        },
        public: true,
      },
      role: new user_js_1.default(),
    });
    const requestOptions = {
      body: raw,
      headers: myHeaders,
      method: "POST",
      redirect: "follow",
    };
    console.log("before req");
    await fetch("http://localhost:8000", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    console.log("after req");
    return;
  }
  async getUserInfo(UUID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    let uuid = UUID;
    uuid = uuid.slice(-36);
    const raw = "";
    const requestOptions = {
      body: raw,
      headers: myHeaders,
      method: "GET",
      redirect: "follow",
    };
    await fetch(`http://localhost:8000`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    return;
  }
  async deleteUser(UUID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    const requestOptions = {
      body: UUID,
      headers: myHeaders,
      method: "DELETE",
      redirect: "follow",
    };
    await fetch(`http://localhost:8000`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    return;
  }
  async updateUserInfo(UUID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = {
      _id: UUID,
      age: 22,
      party_history: [1],
      phone_number: "0000000000",
    };
    const requestOptions = {
      body: JSON.stringify(raw),
      headers: myHeaders,
      method: "PATCH",
      redirect: "follow",
    };
    await fetch(`http://localhost:8000`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    return;
  }
}
exports.Server = Server;
function httpError(res, code, message) {
  res.writeHead(code, message);
  res.end();
}
module.exports = Server;
