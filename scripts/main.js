async function checkToken() {
	/*
	get all fields
	*/
	var alert = document.getElementById("alert-doe");
	var list = document.getElementsByClassName("list-group")[0];
	var id = document.getElementById("id");
	var tag = document.getElementById("tag");
	var tel = document.getElementById("phone");
	var loc = document.getElementById("locale");
	var email = document.getElementById("email");
	var ver = document.getElementById("verified");
	var profile = document.querySelector("#profile");
	var token = document.getElementsByClassName("output")[0].value;

	/*
	make everything invisible if new token is submitted
	*/
	alert.style.display = "none";
	list.style.display = "none";
	profile.style.display = "none";
	/*
	fetch @me object from discord:

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
	let response = await fetch("https://discordapp.com/api/v6/users/@me", {
		method: "GET",
		headers: { Authorization: token },
	});
	response = await response.json();

	/*
	if token is invalid => means if no username returned
	*/
	if (!response.username) {
		return (alert.style.display = "block");
	}

	/*
	check if user has custom profile picture
	*/
	if (response.avatar) {
		profile.src = "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=128";
	} else {
		profile.src = "https://cdn.discordapp.com/embed/avatars/" + (response.discriminator % 5) + ".png?size=128";
	}

	/*
	assign new values to li fields
	*/
	tag.textContent = response.username + "#" + response.discriminator;
	email.textContent = response.email ? response.email : "no email";
	ver.textContent = response.verified ? "verified" : "not verified";
	tel.textContent = response.phone ? response.phone : "no phone";
	id.textContent = response.id;
	loc.textContent = response.locale;

	/*
	make list & profile picture visible
	*/
	profile.style.display = "flex";
	list.style.display = "block";
}
