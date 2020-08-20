async function checkToken() {
	var token = document.getElementsByClassName("output")[0].value;
	let response = await fetch("https://discordapp.com/api/v6/users/@me", {
		method: "GET",
		headers: { Authorization: token },
	});
	response = await response.json();

	var profile = document.querySelector("#profile");
	profile.src = "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=128";
	profile.style.display = "flex";

	var tag = (document.getElementById("tag").textContent = response.username + "#" + response.discriminator);

	var email = document.getElementById("email");
	email.textContent = response.email;

	var ver = document.getElementById("verified");
	ver.textContent = response.verified ? "verified" : "not verified";

	var id = document.getElementById("id");
	id.textContent = response.id;

	var loc = document.getElementById("locale");
	loc.textContent = response.locale;

	var tel = document.getElementById("phone");
	tel.textContent = response.phone;
	document.getElementsByClassName("list-group")[0].style.display = "block";

	/*
	example response:
		{
			"id": "",
			"username": "",
			"avatar": "",
			"discriminator": "",
			"public_flags": 256,
			"flags": 256,
			"email": null,
			"verified": false,
			"locale": "",
			"nsfw_allowed": true,
			"mfa_enabled": false,
			"phone": null
		}
	*/
}
