var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require('express-session');

var db = require("./models");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }//secure: true 
}));
 
/*if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}*/
 
// app.use(session(sess));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override various requests..
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

require("./routes/api-routes.js")(app);
// // var x = require("./routes/api-routes.js");
// // console.log(x);
require("./routes/html-routes.js")(app);


db.sequelize.sync({force:true}).then(function(){

	db.User.create({

		email:"user1@email.com",
		password:"password123",
		displayName:"John Smith 1"
	}).then(function(user){

	}).catch();
	db.User.create({
		email:"user2@email.com",
		password:"password123",
		displayName:"John Smith 2"
	}).then().catch();
	db.User.create({
		email:"user3@email.com",
		password:"password123",
		displayName:"John Smith 3"
	}).then().catch();
	db.Lesson.create({
			subject:"Algebra",
			topic:"Exponents",
			content:"/assets/img/exponentlesson1.png"
		}
		).then(function(l){
			db.Quiz.create(
				{
					subject: l.subject,
					topic:l.topic,
					LessonId: l.id
					// lessons:[l]
				},
				{
					include: [db.Lesson]
				}
			).then(function(q){
				db.Problem.create({
					question:"/assets/img/exponent1.png",
					choices:"A. 625\nB. 125\nC. 20\nD.25",
					correctAnswer:"A",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/exponent2.png",
					choices:"A. 9 B. 27 C. 6 D.18",
					correctAnswer:"B",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/exponent3.png",
					choices:"A. -1\nB. 0\nC. 1\nD.80",
					correctAnswer:"C",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/exponent4.png",
					choices:"A. undefined\nB. 100\nC. 1000\nD.0",
					correctAnswer:"B",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/exponent5.png",
					choices:"A. 9\nB. -64\nC. 6\nD.18",
					correctAnswer:"B",
					QuizId: q.id
				},{include: [db.Quiz]});
			}).catch();
			db.Quiz.create(
				{
					subject: l.subject,
					topic: l.topic,
					LessonId: l.id
					// lessons:[l]
				},
				{
					include: [db.Lesson]
				}
			).then(function(q){

				db.Problem.create({
					question:"/assets/img/exponent6.png",
					choices:"A. -4096\nB. 4096\nC. 32\nD.64",
					correctAnswer:"B",
					QuizId: q.id
				},{include: [db.Quiz]});

				db.Problem.create({
					question:"/assets/img/exponent7.png",
					choices:"A. -9\nB. 9\nC. -1/9\nD.1/9",
					correctAnswer:"C",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/exponent8.png",
					choices:"A. -5\nB. 1\nC. 5\nD.0",
					correctAnswer:"B",
					QuizId: q.id
				},{include: [db.Quiz]});

				db.Problem.create({
					question:"/assets/img/exponent9.png",
					choices:"A. 343\nB. 49\nC. 21\nD.73",
					correctAnswer:"A",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/exponent10.png",
					choices:"A. 216\nB. -216\nC. undefined\nD.36",
					correctAnswer:"B",
					QuizId: q.id
				},{include: [db.Quiz]});

				
			});

			
			

			


			
	});
	db.Lesson.create({
			subject:"Algebra 1",
			topic:"Parabolas",
			content:"/assets/img/parabolaslesson1.png"
		}
		).then(function(l){
			db.Quiz.create(
				{
					subject: l.subject,
					topic:l.topic,
					LessonId: l.id
					// lessons:[l]
				},
				{
					include: [db.Lesson]
				}
			).then(function(q){
				db.Problem.create({
					question:"/assets/img/parabolas1.png",
					choices:"A. (0,0); maximum\nB. (0,0); minimum\nC. (1,0); minimum\nD. (1,0); maximum",
					correctAnswer:"A",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/parabolas2.png",
					choices:"A. width = 14 ft; area = 196 ft^2\nB. width = 14 ft; area = 588 ft2\nC. width = 28 ft; area = 420 ft2\nD. width = 28 ft; area = 196 ft2",
					correctAnswer:"A",
					QuizId: q.id
				},{include: [db.Quiz]});
				db.Problem.create({
					question:"/assets/img/parabolas3.png",
					choices:"A. 1.25 s; 85 ft\nB. 1.25 s; 40 ft\nC. 1.25 s; 35 ft\nD. 2.5 s; 10 ft",
					correctAnswer:"A",
					QuizId: q.id
				},{include: [db.Quiz]});
			});
			


			
	});

	db.Lesson.create({
		subject: "Algebra 1",
		topic: "Roots",
		content: "/assets/img/rootslesson1.png"
	}).then(function(l){
		db.Quiz.create({
			subject: l.subject,
			topic: l.topic,
			LessonId:l.id
		},
		{
			include: [db.Lesson]
		}).then(function(q){
			db.Problem.create({
				question: "/assets/img/roots3.png",
				choices:"A.  49  B. 7  C. undefined D. 64",
				correctAnswer: "B",
				QuizId: q.id
			},{include: [db.Quiz]});
			db.Problem.create({
				question: "/assets/img/roots4.png",
				choices:"A.  49  B. 7  C. 5 D. 64",
				correctAnswer: "C",
				QuizId: q.id
			},{include: [db.Quiz]});
			db.Problem.create({
				question: "/assets/img/roots5.png",
				choices:"A.  3  B. 7  C. undefined D. 64",
				correctAnswer: "A",
				QuizId: q.id
			},{include: [db.Quiz]});
			db.Problem.create({
				question: "/assets/img/roots6.png",
				choices:"A.  49  B. 7  C. undefined D. 11",
				correctAnswer: "D",
				QuizId: q.id
			},{include: [db.Quiz]});

		});
	});
	

	// Do your seeding here.....
	
	// db.Quiz.create({
	// 	subject:"Calculus",
	// 	topic:"Integrals",
	// 	content:"blahblahblah",
	// 	QuizId: [{}]
	// });

	app.listen(PORT, function(){
		console.log("Listening on port %s", PORT);
	});
});