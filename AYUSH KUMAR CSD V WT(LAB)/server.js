const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/createCookie", (req, res) => {
    const users = ["user1", "user2", "user3", "user4"];
    const passwords = ["pwd1", "pwd2", "pwd3", "pwd4"];

    for (let i = 0; i < users.length; i++) {
        res.cookie(users[i], passwords[i], {
            maxAge: 60 * 60 * 1000,
            path: "/"
        });
    }

    res.send(`
        <h3>Cookies created for 4 users.</h3>
        <a href="/login.html">Go to Login Page</a>
    `);
});

app.post("/login", (req, res) => {
    const { userid, password } = req.body;

    if (req.cookies[userid] === password) {
        res.send(`<h2>Login Successful</h2>
                  <p>Welcome, ${userid}!</p>`);
    } else {
        res.send(`
            <h2>Login Failed</h2>
            <p>Invalid user id or password.</p>
            <a href="/login.html">Try again</a>
        `);
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});