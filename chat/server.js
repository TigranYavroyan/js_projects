const express = require("express");
const path = require("path");
const app = express();

const port = 3000;
const auth_files = "public/auth";
const chat_files = "public/chat";
let send_count = 0;

const users_messages = [];

app.use("/auth", express.static(auth_files)); // Static files for auth
app.use("/chat", express.static(chat_files)); // Static files for chat

app.use(express.json());
app.use(express.text());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, auth_files, "index.html"));
});

app.get("/chat", (req, res) => {
	res.sendFile(path.join(__dirname, chat_files, "index.html"));
});

app.post("/user", (req, res) => {
	const username = req.body

	users_messages.push({user: username, messages: []});
	console.log("Username is ", username);
	res.status(200).send("OK");
});

app.post("/messages", (req, res) => {
	const msg = req.body.message;
	const user = req.body.user;
	if (user) {
		for (let i = 0; i < users_messages.length; ++i) {
			if (users_messages[i].user === user) {
				users_messages[i].messages.push(msg);
				break;
			}
		}
	}
	else
		console.log("Not valid username: ", user);
	console.log("Msg from front: ", msg);
	res.status(200).send("OK");
});

app.post("/sent", (req, res) => {
	const from_user = req.body.username;
	console.log("From user: ", from_user);
	// filter user messages from here

	const all_msgs = [];
	for (let i = 0; i < users_messages.length; ++i) {
		if (users_messages[i].user !== from_user) {
			const msgs = users_messages[i].messages;
			for (let j = 0; j < msgs.length; ++j) {
				all_msgs.push(msgs[j]);
			}
		}
	}
	console.log("All messages:", users_messages);
	console.log("Must send:", all_msgs);

	// to here
	// console.log("Send data from get_req: ", ob);
	// res.json(ob);
	res.json({
		for_user: from_user,
		messages: all_msgs
	});
	++send_count;
	if (send_count >= users_messages.length) {
		for (let i = 0; i < users_messages.length; ++i) {
			users_messages[i].messages = [];
		}
		send_count = 0;
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});