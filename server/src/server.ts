import express from "express";
import { productionSetup } from "./production";
import mongoose from "mongoose"

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";
const connectionUri = process.env.MONGODB_DEV_URI || 'mongodb://localhost/learning-tool-database';

if (env === "production") {
    productionSetup(app);
    connectionUri = process.env.MONGODB_PROD_URI || 'mongodb://localhost/learning-tool-database';
}

mongoose.connect(connectionUri);

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
