let resForCopy;
async function checkToken() {
	/*
	get all fields
	*/
	var alerter = document.getElementById("alert");
	var list = document.getElementsByClassName("list_group")[0];
	var token_input = document.getElementsByClassName("input_main")[0];
	var token = token_input.value;
	var copyButton = document.getElementById("copybtn");

	var id = document.getElementById("id");
	var tag = document.getElementById("tag");
	var tel = document.getElementById("phone");
	var loc = document.getElementById("locale");
	var email = document.getElementById("email");
	var ver = document.getElementById("verified");
	var profile = document.querySelector("#profile");
	var phoneblocked = document.getElementById("phoneblocked");

	/*
	hide list, picture and invalid token alert
 	*/
	list.classList.add("hide");
	alerter.classList.add("hide");
	profile.classList.add("hide");
	copyButton.classList.add("hide");
	token_input.classList.remove("invalid_token");

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
	let response;
	try {
		response = await fetch("https://discordapp.com/api/v6/users/@me", {
			method: "GET",
			headers: { Authorization: token },
		});
		response = await response.json();
	} catch (e) {
		return alert(`Request failed: ${e}`);
	}
	resForCopy = response;
	/*
	if token is invalid => means if no username returned
	*/
	if (!response.username) {
		alerter.classList.remove("hide");
		token_input.classList.add("invalid_token");
		return;
	}

	/*
	if response.status !== 200 -> account is phoneblocked
	*/

	let phoneBlockCheck;
	try {
		phoneBlockCheck = await fetch("https://discordapp.com/api/v6/users/@me/library", {
			method: "GET",
			headers: { Authorization: token },
		});
		phoneBlockCheck = phoneBlockCheck.status;
	} catch (e) {
		return alert(`Request failed: ${e}`);
	}

	switch (phoneBlockCheck) {
		case 200:
			phoneBlockCheck = "not phone locked";
			break;
		default:
			phoneBlockCheck = "phone locked";
			break;
	}
	resForCopy.phoneBlockCheck = phoneBlockCheck;
	resForCopy.tag = response.username + "#" + response.discriminator;

	/*
	check if user has custom profile picture
	*/
	if (response.avatar) {
		profile.src = "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=256";
	} else {
		profile.src = "https://cdn.discordapp.com/embed/avatars/" + (response.discriminator % 5) + ".png?size=256";
	}
	resForCopy.avatarURL = document.querySelector("#profile").src;

	/*
	assign new values to li fields
	*/
	tag.textContent = response.username + "#" + response.discriminator;
	email.innerHTML = response.email ? `<a href="mailto://${response.email}">${response.email}</a>` : "no email";
	ver.textContent = response.verified ? "Email verified" : "Email not verified";
	tel.innerHTML = response.phone
		? `<a href="https://www.searchyellowdirectory.com/reverse-phone/${response.phone}">${response.phone}</a>`
		: "no phone number";
	id.textContent = response.id;
	loc.textContent = response.locale;
	phoneblocked.textContent = phoneBlockCheck;

	/*
	make list & profile picture visible
	*/
	profile.classList.remove("hide");
	list.classList.remove("hide");
	copyButton.classList.remove("hide");
}
function copyValues() {
	navigator.clipboard.writeText(
		JSON.stringify(resForCopy).replace(/,/g, ",\n\t").replace(/{/g, "{\n\t").replace(/}/g, "\n}")
	);
}
