"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';
if (env !== 'production') {
    require('./production')(app);
}
app.get('/', function (req, res) {
    res.send('Some placeholder text!');
});
app.listen(port, function () {
    return console.log("Server is listening on " + port);
});
