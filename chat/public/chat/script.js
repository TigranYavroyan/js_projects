const messagesContainer = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const back_port = 3000;
const back = `http://localhost:${back_port}/`;
const backendEndpoint = `${back}messages`;
const curr_user = sessionStorage.getItem("username");
console.log("I am", curr_user);
sessionStorage.removeItem("username");

// Function to display a message
function addMessage(text, isSent) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(isSent ? 'sent' : 'received');
  messageElement.textContent = text;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function fetch_new_messages_1s() {
  setInterval(async () => {
    try {
      const response = await fetch_data(`${back}sent`, "POST", {username: curr_user})
      const data = await response.json();
      if (data.for_user === curr_user) {
        console.log("Right user sent!!!");
        console.log("Data:", data);
        data.messages.forEach((msg) => {
          addMessage(msg, false);
        });
      }
    }
    catch (err) {
      console.log("Error from server: ", err);
    }
  }, 1000);
}

async function fetch_data (URL, _method, json) {
	let obj = {};
	if (_method !== null) {
		obj = {
			method: _method,
			headers: {
				"Content-Type": "application/json"
			},
			body : JSON.stringify(json)
		};
	}
	try {

		const response = await fetch(URL, obj);

		if (!response.ok) {
			throw new Error(`Error, status: ${response.status}`);
		}
    return response;
	}
	catch (err) {
		console.log("Exception: ", err);
	}
}

// Send button click event
sendButton.addEventListener('click', async () => {
  const messageText = messageInput.value.trim();
  if (messageText) {
    // Display the sent message
    addMessage(messageText, true);
    
    // Clear the input
    messageInput.value = '';

    await fetch_data(backendEndpoint, "POST", {message: messageText, user: curr_user});
  }
});

fetch_new_messages_1s();