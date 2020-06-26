window.onload = async function () {
	let latestContainer = document.getElementById("latests_container");
	let filme = await fetch("/filme");
	let filmeData = await filme.json();
	filmeData = filmeData.filme;
	for (let i = 0; i < filmeData.length; i++) {
		let article = document.createElement("article");
		let poster = document.createElement("img");
		poster.src = filmeData[i].poster;
		let trailer = document.createElement("iframe");
		trailer.src = filmeData[i].trailer;
		trailer.allow =
			"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
		let detailsDiv = document.createElement("div");
		detailsDiv.className = "details";
		let title = document.createElement("h2");
		title.innerText = filmeData[i].titlu;
		let mark = document.createElement("b");
		mark.innerText = filmeData[i].nota + "/10";
		let desc = document.createElement("p");
		desc.innerText = filmeData[i].desc;
		desc.innerHTML += "<br><br>";
		let readMore = document.createElement("span");
		readMore.className = "read_more";
		let readBtn = document.createElement("a");
		readBtn.href = "review/"+filmeData[i].id; 
		readBtn.innerText = "Citeste in continuare →";
		readMore.appendChild(readBtn);
		desc.appendChild(readMore);
		detailsDiv.appendChild(title);
		detailsDiv.appendChild(mark);
		detailsDiv.appendChild(desc);
		article.appendChild(poster);
		article.appendChild(trailer);
		article.appendChild(detailsDiv);
		latestContainer.appendChild(article);
	}
};
