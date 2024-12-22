const express = require("express");
const path = require("path");
const app = express();

const port = 3000;
const auth_files = "public/auth";
const chat_files = "public/chat";

const get_messages = [];
const users_arr = [];

app.use("/auth", express.static(auth_files)); // Static files for auth
app.use("/chat", express.static(chat_files)); // Static files for chat

app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, auth_files, "index.html"));
});

app.get("/chat", (req, res) => {
	res.sendFile(path.join(__dirname, chat_files, "index.html"));
});

app.get("/sent", (req, res) => {
	const ob = {
		type: "sent",
		messages: get_messages
	}
	// get_messages = [];
	console.log("Send data from get_req: ", ob);
	res.json(ob);
});

app.post("/user", (req, res) => {
	const username = req.body

	users_arr.push(username);
	console.log("Username is ", username);
	res.status(200);
});

app.post("/messages", (req, res) => {
	const msg = req.body.message;
	console.log("Msg from front: ", msg);
	get_messages.push(msg);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});