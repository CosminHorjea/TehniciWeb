window.onload = async function () {
	let tabel = document.getElementsByTagName("tbody")[0];
	let filme = await fetch("/filme");
	let filmeData = await filme.json();
	filmeData = filmeData.filme;
	console.log(filmeData);
	filmeData.sort((a, b) => {
		return parseFloat(b.nota) - parseFloat(a.nota);
	});
	for (let i = 0; i < filmeData.length; i++) {
		//creez un template ejs (primul parametru al lui ejs.render)
		//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
		// //practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
		// let textTemplate = ejs.render(
		// 	"<div class='templ_student'>\
		// <p>Id: <%= student.id %></p>\
		// <p>Grupa: <%= student.grupa %></p>\
		// <p>Nume complet: <%= student.nume %> <%= student.prenume %></p>\
		// </div>",
		// 	{ student: obJson.studenti[i] }
		// );
		let textTemplate = ejs.render(
			"<tr>\
				<td>\
					<a href='/review/<%= film.id %>'><img src='<%= film.poster %>'></a>\
				</td><td><h2>" +
				(i + 1) +
				"</h2></td><td><p><%= film.desc%><p></td><td><%=film.nota%>/10</td></tr>",
			{ film: filmeData[i] }
		);
		tabel.innerHTML += textTemplate;
	}
};
