const messagesContainer = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const back_port = 3000;
const back = `http://localhost:${back_port}/`;
const backendEndpoint = `${back}messages`;

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
      const response = await fetch(`${back}sent`, {
        method: "GET",
      });

      const data = await response.json();
      console.log("fetch data from getting new messages: ", data);
      const messages = data.messages;

      if (messages.length !== 0) {
        for (let i = 0; i < messages.length; ++i) {
          addMessage(messages[i], false);
        }
      }
    }
    catch (err) {
      console.log("Error from server: ", err);
    }
  }, 1000);
}

async function fetch_data (_method, json) {
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

		const response = await fetch(backendEndpoint, obj);

		if (!response.ok) {
			throw new Error(`Error, status: ${response.status}`);
		}

		const data = await response.json();
		console.log(`Data: ${data}`);
		return data;
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

    const data = await fetch_data("POST", {message: messageText});
    addMessage(data.data, false);
  }
});

fetch_new_messages_1s();