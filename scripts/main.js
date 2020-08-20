async function checkToken() {
	document.getElementById("alert-doe").style.display = "none";

	var token = document.getElementsByClassName("output")[0].value;

	let response = await fetch("https://discordapp.com/api/v6/users/@me", {
		method: "GET",
		headers: { Authorization: token },
	});

	response = await response.json();

	var profile = document.querySelector("#profile");

	if (!response.username) {
		return (document.getElementById("alert-doe").style.display = "block");
	}

	if (response.avatar) {
		profile.src = "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=128";
	} else {
		profile.src = "https://cdn.discordapp.com/embed/avatars/" + (response.discriminator % 5) + ".png?size=128";
	}

	profile.style.display = "flex";

	var tag = (document.getElementById("tag").textContent = response.username + "#" + response.discriminator);

	var email = document.getElementById("email");
	email.textContent = response.email ? response.email : "no email";

	var ver = document.getElementById("verified");
	ver.textContent = response.verified ? "verified" : "not verified";

	var id = document.getElementById("id");
	id.textContent = response.id;

	var loc = document.getElementById("locale");
	loc.textContent = response.locale;

	var tel = document.getElementById("phone");
	tel.textContent = response.phone ? response.phone : "no phone";
	document.getElementsByClassName("list-group")[0].style.display = "block";
}
