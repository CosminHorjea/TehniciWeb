window.onload = async () => {
	//TODO separat in alte functii
	let sliderContainer = document.getElementById("slider_postere");
	let filme = await fetch("/filme");
	let filmeData = await filme.json();
	console.log(filmeData);
	for (let i = 0; i < filmeData.filme.length; i++) {
		console.log(filmeData.filme[i]);
		let poster = document.createElement("img");
		let link = document.createElement('a');
		link.href='review/'+filmeData.filme[i].id;
		poster.src = filmeData.filme[i].poster;
		link.appendChild(poster)
		console.log(poster);
		sliderContainer.appendChild(link);
	}

	let latestsContainer = document.getElementById("review_list");
	for (
		let i = 0;
		i < (filmeData.filme.length > 6 ? 6 : filmeData.filme.length);
		i++
	) {
		let listItem = document.createElement("li");
		let artContainer = document.createElement("article");
		let posterImg = document.createElement("img");
		posterImg.src = filmeData.filme[i].poster;
		let detailsView = document.createElement("div");
		detailsView.className = "details";
		let title = document.createElement("h3");
		title.innerText = filmeData.filme[i].titlu;
		let desc = document.createElement("p");
		desc.innerHTML = `${filmeData.filme[i].desc} <br /> <a href="review/${filmeData.filme[i].id}" class="read_full"
		>Citeste tot review-ul</a
	> <br/>`;
		let nota = document.createElement("span");
		nota.innerText = `Nota: ${filmeData.filme[i].nota}/10`;
		detailsView.appendChild(title);
		detailsView.appendChild(desc);
		detailsView.appendChild(nota);
		artContainer.appendChild(posterImg);
		artContainer.appendChild(detailsView);
		listItem.appendChild(artContainer);
		latestsContainer.appendChild(listItem);
	}
};

