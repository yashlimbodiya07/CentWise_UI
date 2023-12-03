"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app/app"));
const app = (0, express_1.default)();
const port = 3000;
(0, app_1.default)(app);
//app.get('/', (request, response) => response.send('Hello World'));
app.listen(port, () => console.log("Server is listening at port 3000"));
