window.onload = async function () {
	let filme = await fetch("../filme/" + window.location.pathname.split("/")[2]);
	let filmData = await filme.json();
	filmData = filmData[0];
	document.getElementsByTagName("img")[0].src = filmData.poster;
	document.getElementsByTagName("h3")[0].innerText = filmData.titlu;
	document.getElementsByTagName("title")[0].innerText =
		"Review " + filmData.titlu;
	document.getElementsByTagName("b")[0].innerText = filmData.nota + "/10";
	document.getElementById("actors").innerText += filmData.actori;
	document.getElementById("isPG").innerText += filmData.is_PG ? "DA" : "NU";
	let reviewDiv = document.getElementsByClassName("text")[0];
	reviewDiv.innerHTML = filmData.review;
	reviewDiv.innerHTML += "<br>";
	for (let i = 0; i < filmData.gallery.length; i++) {
		let image = document.createElement("img");
		image.src = filmData.gallery[i];
		reviewDiv.appendChild(image);
	}
	let other = document.getElementById("container_otherMovies");
	for (let i = 0; i < 10; i += 3) {
		let dataOtherMovie = await fetch("../filme/" + i);
		dataOtherMovie = await dataOtherMovie.json();
		let linkOther = document.createElement("a");
		linkOther.href = dataOtherMovie[0].id;
		let newPoster = document.createElement("img");
		newPoster.src = dataOtherMovie[0].poster;
		linkOther.appendChild(newPoster);
		other.appendChild(linkOther);
	}
	let headerLinks = document
		.getElementsByTagName("ul")[0]
		.getElementsByTagName("a");
	for (let i = 1; i < headerLinks.length; i++) {
		let vec = headerLinks[i].href.split("/");
		headerLinks[i].href = "../" + vec[vec.length - 1];
		// console.log(headerLinks[i].href.split("/"));
	}
	document.getElementById("commentForm").onsubmit = async (e) => {
		e.preventDefault();
		let outgoing_comment = {};
		outgoing_comment.id = 0;
		outgoing_comment.movieId = parseInt(window.location.pathname.split("/")[2]);
		outgoing_comment.username = document.getElementById("name_input").value;
		outgoing_comment.desc = document.getElementById("comment_area").value;
		outgoing_comment.upvotes = 0;
		outgoing_comment.downvotes = 0;
		// console.log(outgoing_comment);

		let response = await fetch("../../comentarii", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(outgoing_comment),
		});
		document.getElementById("name_input").value = "";
		document.getElementById("comment_area").value = "";
		createComment(outgoing_comment);
	};
	renderComments();
};

function createComment(data) {
	if (data.downvotes > 3) return;
	let article = document.createElement("article");
	let img = document.createElement("img");
	img.src = "../imgs/user.svg";
	img.height = 32;
	img.width = 32;
	article.appendChild(img);
	let btn1 = document.createElement("button");
	btn1.innerText = "+";
	btn1.onclick = (e) => {
		fetch("../../upvote/" + data.id, { method: "POST" });
		btn1.nextSibling.innerText = parseInt(btn1.nextSibling.innerText) + 1;
	};
	let score = document.createElement("span");
	score.innerText = data.upvotes - data.downvotes;
	let btn2 = document.createElement("button");
	btn2.innerText = "-";
	btn2.onclick = (e) => {
		fetch("../../downvote/" + data.id, { method: "POST" });
		btn2.previousSibling.innerText =
			parseInt(btn2.previousSibling.innerText) - 1;
	};
	article.appendChild(btn1);
	article.appendChild(score);
	article.appendChild(btn2);
	let userNameHeader = document.createElement("h4");
	userNameHeader.innerText = data.username;
	let paragraphElement = document.createElement("p");
	paragraphElement.innerText = data.desc;
	article.appendChild(userNameHeader);
	article.appendChild(paragraphElement);
	document
		.getElementById("comments_area")
		.insertBefore(
			article,
			document.getElementById("comments_area").children[0]
		);
}

async function renderComments() {
	// document.getElementById('comments_area').innerHTML=""
	let comentarii = await fetch(
		"../../comentarii/" + window.location.pathname.split("/")[2]
	);
	comentarii = await comentarii.json();
	comentarii = comentarii;
	// console.log(comentarii);
	comentarii.forEach((e) => {
		createComment(e);
	});
}
let isShowComments = 1;
function toggleComments() {
	if (isShowComments) {
		isShowComments = 0;
		document.getElementById("comments_area").style.display = "none";
		document.getElementById("toggleBtn").innerText = "Afiseaza comentarii";
	} else {
		isShowComments = 1;
		document.getElementById("comments_area").style.display = "block";
		document.getElementById("toggleBtn").innerText = "Ascunde comentarii";
	}
}
