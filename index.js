var express = require("express"); /*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/

var path = require("path");
var app = express(); //aici avem serverul

// pentru folosirea ejs-ului
app.set("view engine", "ejs");

console.log(__dirname); //calea catre radacina proiectului
app.use(express.static(path.join(__dirname, "resurse")));
//din acest moment toate caile catre fisierele statice le scriem relativ la folderul resurse

// cand se face o cerere get catre pagina de index
app.get("/", function (req, res) {
  /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
  res.render("html/index");
});

// app.get('/ceva', function(req, res) {
// 	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
//     console.log("a intrat pe request")
// 		res.setHeader("Content-Type", "text/html");
// 		res.write("<html><body><p>Salut!!!!</p>");
// 		//if(cond)
// 		res.write("</body></html>");
// 		res.end();
// });
app.get("/contact", function (req, res) {
  res.render("html/contact");
});

//TODO celelalte pagini
app.get("/latest", function (req, res) {
  res.render("html/latest");
});
app.get("/review", function (req, res) {
  res.render("html/review");
});
app.get("/top", function (req, res) {
  res.render("html/top");
});

app.get("/inreg", function (req, res) {
  res.render("html/inregistrare");
});
app.post("/inreg", function (req, res) {
});
app.post("/login", function (req, res) {
});
app.use(function (req, res) {
  res.status(404).render("html/404");
});

app.listen(8080);
console.log("Aplicatia se va deschide pe portul 8080.");
