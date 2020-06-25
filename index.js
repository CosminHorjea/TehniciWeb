var express = require("express");
let crypto = require("crypto");
let session = require("express-session");
let fs = require("fs");
let bodyParser = require("body-parser");
let formidable = require("formidable");
var path = require("path");
var app = express(); //aici avem serverul

// pentru folosirea ejs-ului
app.set("view engine", "ejs");

console.log(__dirname); //calea catre radacina proiectului
app.use(express.static(path.join(__dirname, "resurse")));
app.use(
	session({ secret: "cheie_sesiune", resave: true, saveUninitialized: false })
);
app.use(bodyParser.json());
app.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
});
app.get("/filme", (req, res) => {
	let filme = fs.readFileSync("filme.json");
	// res.setHeader("Content-Type", "application/json");
	res.send(JSON.parse(filme));
});
app.get("/filme/:id", (req, res) => {
	console.log(req.params);
	let filme = fs.readFileSync("filme.json");
	filme = JSON.parse(filme).filme;
	filme = filme.filter((f) => {
		return f.id == req.params.id;
	});
	res.send(filme);
});
app.get("/favicon.ico", function (req, res) {});
app.get("/*", (req, res) => {
	console.log(req.url);
	let user = getUsername(req);
	res.render(`html/${req.url}`, { username: user }, (err, text) => {
		if (err)
			if (err.message.includes("Failed to lookup view"))
				return res.status(404).render("html/404");
			else throw err;
		res.send(text);
	});
});

app.post("/inreg", (req, res) => {
	let formData = new formidable.IncomingForm();
	formData.parse(req, (err, fields, files) => {
		let users = fs.readFileSync("useri.json");
		let hashedPassword = sha256(fields.password);
		let useri = JSON.parse(users);
		let new_user = {
			id: useri.lastId,
			username: fields.username,
			nume: fields.nume,
			parola: hashedPassword,
			filme_pref: fields.favorite_movies,
			email: fields.email,
			dataInreg: new Date(),
			rol: "user",
		};
		useri.useri.push(new_user);
		useri.lastId++;
		fs.writeFileSync("useri.json", JSON.stringify(useri));
	});
	res.redirect("/");
});
app.post("/login", function (req, res) {
	let formData = formidable.IncomingForm();
	formData.parse(req, (err, fields, files) => {
		usersFile = fs.readFileSync("useri.json");
		let crypted = sha256(fields.parola);
		usersObject = JSON.parse(usersFile);
		let utilizator = usersObject.useri.find((e) => {
			return e.username == fields.username && crypted == e.parola;
		});
		if (utilizator) {
			req.session.utilizator = utilizator;
			// res.render("html/index", { user: utilizator });
			res.redirect("/");
		} else {
			res.render("html/index", { error: "Username or password incorect" });
		}
	});
});

app.listen(8080);
console.log("Aplicatia se va deschide pe portul 8080.");

// ---misc
function getUsername(req) {
	return req.session
		? req.session.utilizator
			? req.session.utilizator.username
			: null
		: null;
}
const sha256 = (toHash) =>
	crypto.createHash("sha256").update(toHash, "utf8").digest("hex");
