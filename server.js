const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoUrl = "mongodb://127.0.0.1:27017";
const mongoClient = new MongoClient(mongoUrl);

app.get("/", (request, response) => {
    response.redirect("/register.html");
});

async function startServer() {
    await mongoClient.connect();
    console.log("Connected to MongoDB");

    const database = mongoClient.db("wtlab");
    const userCollection = database.collection("users");

    app.post("/register", async (request, response) => {
        const userDocument = {
            name: request.body.name,
            password: request.body.password,
            email: request.body.email,
            phone: request.body.phone
        };

        await userCollection.insertOne(userDocument);
        response.redirect("/display");
    });

    app.get("/display", async (request, response) => {
        const userList = await userCollection.find().toArray();

        let pageHtml = "<html><body>";
        pageHtml = pageHtml + "<h2>Registered Users</h2>";
        pageHtml = pageHtml + "<table border='1'>";
        pageHtml = pageHtml + "<tr><th>Name</th><th>Password</th><th>Email-id</th><th>Phone</th></tr>";

        for (let index = 0; index < userList.length; index++) {
            pageHtml = pageHtml + "<tr>";
            pageHtml = pageHtml + "<td>" + userList[index].name + "</td>";
            pageHtml = pageHtml + "<td>" + userList[index].password + "</td>";
            pageHtml = pageHtml + "<td>" + userList[index].email + "</td>";
            pageHtml = pageHtml + "<td>" + userList[index].phone + "</td>";
            pageHtml = pageHtml + "</tr>";
        }

        pageHtml = pageHtml + "</table><br>";
        pageHtml = pageHtml + "<a href='/register.html'>Register another user</a>";
        pageHtml = pageHtml + "</body></html>";
        response.send(pageHtml);
    });

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}
startServer();