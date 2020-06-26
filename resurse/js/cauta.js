let movieCards;
let searchBox;
let shownItems;
let filmData;
let checkPG;
let yearValue;
let typeOfSort;
let timeOutID = 0;
window.onload = async function () {
	let filme = await fetch("/filme");
	filmData = await filme.json();
	filmData = filmData.filme;
	movieCards = document.getElementById("movie_cards");
	searchBox = document.getElementById("searchInput");
	searchBox.oninput = (e) => {
		window.localStorage.setItem("searchTerm", searchBox.value);
		applyFilters();
	};
	checkPG = document.getElementById("isPGcheck");
	checkPG.onchange = (e) => {
		applyFilters();
	};
	yearValue = document.getElementById("an_aparitie");
	yearValue.onchange = (e) => {
		applyFilters();
	};
	typeOfSort = document.getElementById("sort_note");
	typeOfSort.onchange = (e) => {
		applyFilters();
	};
	checkForLocalStorage();
	renderData(filmData);
	applyFilters();
};

function renderData(data) {
	movieCards.innerHTML = "";
	for (let i = 0; i < data.length; i++) {
		let textTemplate = ejs.render(
			"<div class='card'>\
				<img src='<%= film.poster %>'/>\
				<div>\
				<h2><%= film.titlu %></h2>\
				<h3><%= film.nota%></h3>\
				</div>\
			</div>	",
			{ film: data[i] }
		);
		movieCards.innerHTML += textTemplate;
	}
	shownItems = data;
}

function filterByName(data, text) {
	if (text.length == "") {
		return data;
	}
	text = text.toLowerCase();
	console.log(data);
	let newMovies = data.filter((e) => e.titlu.toLowerCase().includes(text));
	// renderData(newMovies);
	return newMovies;
}
function filterPG(data, val) {
	if (!val) return data;
	return data.filter((e) => e.is_PG);
}
function filterYear(data, val) {
	if (val == "all") return data;
	return data.filter((e) => e.an_aparitie == val);
}
function sortByMark(data, type) {
	return data.sort((a, b) => {
		if (type == "asc") {
			return a.nota - b.nota;
		} else {
			return b.nota - a.nota;
		}
	});
}
function calculateAvgRating(data) {
	let total = data.reduce((acc, e) => acc + parseFloat(e.nota), 0);
	document.getElementById("avgRating").innerText = (
		total / data.length
	).toFixed(2);
}
function applyFilters() {
	if (timeOutID) {
		clearTimeout(timeOutID);
		timeOutID = 0;
	}
	timeOutID = setTimeout(resetFilters, 1000 * 60 * 2);

	let toShow = filmData;
	toShow = filterByName(toShow, searchBox.value);
	toShow = filterPG(toShow, checkPG.checked);
	toShow = filterYear(toShow, yearValue.value);
	toShow = sortByMark(toShow, typeOfSort.value);
	renderData(toShow);
	calculateAvgRating(toShow);
}

function checkForLocalStorage() {
	let searchString = window.localStorage.getItem("searchTerm");
	if (searchString) {
		searchBox.value = searchString;
	}
}

function resetFilters() {
	searchBox.value = "";
	checkPG.checked = false;
	yearValue.value = "all";
	typeOfSort = "asc";
	applyFilters();
	clearInterval(timeOutID);
	alert("Nu ati mai efectuat o cautare de doua minite, filtrele s-au resetat");
}
