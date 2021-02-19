import express from "express";
import { production_setup } from "./production";
import mongoose from "mongoose"

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";
let connection_uri = process.env.MONGODB_DEV_URI || 'mongodb://localhost/learning-tool-database';

if (env === "production") {
    production_setup(app);
    connection_uri = process.env.MONGODB_PROD_URI
}

mongoose.connect(connection_uri);

const mockResponse = {
    foo: "bar",
    bar: "foo",
};

app.get("/api", (req, res) => {
    res.send(mockResponse);
});

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.listen(port);
