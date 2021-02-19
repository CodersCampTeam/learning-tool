import express from "express";
import { production_setup } from "./production";

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";

if (env !== "production") {
    production_setup(app);
}

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
