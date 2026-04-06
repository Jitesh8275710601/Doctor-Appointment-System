const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Homepage");
})

app.get("/users", (req, res) => {
    res.send(`
        <h1>1</h1>
        <h1>Jitesh</h1>
        <h1>Jitesh@gmail.com</h1>
        <h1>797237236876</h1>
        `)
})

app.listen(3000, () => {
    console.log("server started at http://localhost:3000");
})