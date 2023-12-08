import { Server } from "./app.js";
let url = "http://localhost:8000/user?del_profile";
let UUID = "034e0c73-6f80-4d82-a348-20acc997130a";
let serverST2 = new Server(8000, "localhost");
console.log("test");
serverST2.create();
switch (url) { //make sure the body is json
    case "http://localhost:8000/user?login":
        await serverST2.userLogin();
        break;
    case "http://localhost:8000/user?profile":
        await serverST2.getUserInfo(UUID);
        break;
    case "http://localhost:8000/user?edit_profile":
        await serverST2.updateUserInfo(UUID);
        break;
    case "http://localhost:8000/user?del_profile":
        await serverST2.deleteUser(UUID);
        break;
    default:
        break;
}
