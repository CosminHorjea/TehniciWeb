window.onload = async function () {
	let filme = await fetch("../filme/" + window.location.pathname.split("/")[2]);
	let filmData = await filme.json();
	filmData = filmData[0];
	document.getElementsByTagName("img")[0].src = filmData.poster;
	document.getElementsByTagName("h3")[0].innerText = filmData.titlu;
	document.getElementsByTagName("title")[0].innerText =
		"Review " + filmData.titlu;
	document.getElementsByTagName("b")[0].innerText = filmData.nota + "/10";
	let reviewDiv = document.getElementsByClassName("text")[0];
	reviewDiv.innerHTML = filmData.review;
	reviewDiv.innerHTML += "<br>";
	for (let i = 0; i < filmData.gallery.length; i++) {
		let image = document.createElement("img");
		image.src = filmData.gallery[i];
		reviewDiv.appendChild(image);
	}

	let headerLinks = document
		.getElementsByTagName("ul")[0]
		.getElementsByTagName("a");
	for (let i = 1; i < headerLinks.length; i++) {
		let vec = headerLinks[i].href.split("/");
		headerLinks[i].href = "../" + vec[vec.length - 1];
		console.log(headerLinks[i].href.split("/"));
	}
};
