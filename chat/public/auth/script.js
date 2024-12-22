const backend = "http://localhost:3000/";

document.getElementById('nameForm').addEventListener('submit', async (event) => {
	event.preventDefault(); // Prevent form submission
	const name = document.getElementById('name').value.trim();

	if (name) {
		fetch(`${backend}user`, {
			method: "POST",
			headers: {
				"Content-Type": "text/plain"
			},
			body: name
		});
		localStorage.setItem('username', name);
		window.location.href = `${backend}chat`;
	}
	else {
		alert('Please enter your name before submitting!');
	}
});