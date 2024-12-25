const backend = "http://localhost:3000/";

document.getElementById('nameForm').addEventListener('submit', async (event) => {
	event.preventDefault(); // Prevent form submission
	const name = document.getElementById('name').value.trim();

	if (name) {
		try {
			fetch(`${backend}user`, {
				method: "POST",
				headers: {
					"Content-Type": "text/plain"
				},
				body: name
			});
			sessionStorage.setItem("username", name);
			window.location.href = `${backend}chat`;
		}
		catch (err) {
			console.log("Error: ", err);
		}
	}
	else {
		alert('Please enter your name before submitting!');
	}
});