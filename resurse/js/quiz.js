let quizContainer;
let correctAns;
let aux = [];
let scoreShow = document.createElement("h1");
window.onload = async function () {
	let qData = await fetch("intrebariQuiz");
	qData = await qData.json();
	qData = qData.intrebari;
	quizContainer = document.getElementById("quizContainer");
	correctAns = qData.map((e) => e.raspunsuri);
	for (let i = 0; i < correctAns.length; i++) {
		aux.push(correctAns[i].filter((e) => e[1]));
	}
	correctAns = aux.map((e) => e[0]);
	// console.log(correctAns);
	renderQustions(qData);
};

function renderQustions(data) {
	let list = document.createElement("ol");
	for (let i = 0; i < data.length; i++) {
		let q = document.createElement("li");
		q.innerText = data[i].intrebare;
		let ansList = document.createElement("ul");
		for (let j = 0; j < data[i].raspunsuri.length; j++) {
			let ans = document.createElement("li");
			let check = document.createElement("input");
			check.type = "checkbox";
			ans.appendChild(check);
			ans.innerHTML += data[i].raspunsuri[j][0];
			ansList.appendChild(ans);
		}
		list.appendChild(q);
		list.appendChild(ansList);
	}
	quizContainer.appendChild(list);
	let submitBtn = document.createElement("button");
	submitBtn.innerText = "Trimite testul";
	submitBtn.onclick = verifyQuestions;
	quizContainer.appendChild(submitBtn);
}

function verifyQuestions() {
	let list = quizContainer.getElementsByTagName("input");
	let selected = [];
	list = Array.prototype.slice.call(list);
	list = list.filter((e) => e.checked);
	for (let i = 0; i < list.length; i++) {
		selected.push(list[i].parentNode.innerText);
	}
	if (selected.length != 5) {
		scoreShow.innerText = "Inputul nu a fost corect!";
		quizContainer.appendChild(scoreShow);
		return;
	}
	let score = 0;
	console.log(selected);
	console.log(correctAns);
	for (let i = 0; i < 5; i++) {
		if (selected[i] == correctAns[i][0]) {
			score += 1;
		}
	}
	scoreShow.innerText = score;
	quizContainer.appendChild(scoreShow);
	disableChecks();
}
function disableChecks() {
	let checks = document.getElementsByTagName("input");
	checks = Array.prototype.slice.call(checks);
	for (let i = 0; i < checks.length; i++) {
		checks[i].disabled = true;
	}
}
