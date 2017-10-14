var express = require("express");
var session = require('express-session');

var app = express();

// Import the model (burger.js) to use its database functions.
var db = require("../models");
 
console.log("req");

module.exports = function(app){
var path = require("path");
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
 

// Create all our routes and set up logic within those routes where required.
app.get("/users/:id", function(req, res) {
  db.User.findOne({
    where:{
      id:req.params.id
    }
  }).then(function(currentUser){
    res.render("home", {user: currentUser});
  }).catch(function(error){
    console.log(error);
  });
  
  
});


app.get("/lessons", function(req, res){
  db.Lesson.findAll({order:[["subject", "ASC"],["topic", "ASC"]]}).then(function(lessons){
    res.render("lessons", {lessons: lessons})
  }).catch(function(error){
    console.log(error);
  });
});

app.get("/lessons/:id", function(req, res){
  db.Lesson.findOne({where:{id:req.params.id}}).then(function(lesson){
    db.Quiz.findAll({where:{
      LessonId: req.params.id},
      order:[["subject", "ASC"],["topic", "ASC"]]
    
    }).then(function(quizzes){
        res.render("lesson", {lesson: lesson, quizzes: quizzes})

    }).catch(function(error){console.log(error);});

  }).catch(function(error){
    console.log(error);
  });
});
app.get("/signup", function(req,res){
  res.render("signup", {});
});

app.get("/quizzes", function(req, res){
  db.Quiz.findAll({
    order:[["subject", "ASC"],["topic", "ASC"]]
  }).then(function(quizzes){
    res.render("quizzes", {quizzes: quizzes})
  }).catch(function(error){
    console.log(error);
  });
});

app.get("/quizzes/:id", function(req, res){

  db.Problem.findAll({
    where : {
      QuizId: req.params.id
    },
    order: [["id", "ASC"]]
  }).then(function(problems){

  db.Quiz.findOne({where:{id:req.params.id}}).then(function(quiz){
    res.render("quiz", {quiz: quiz, problems: problems})
  }).catch(function(error){
    console.log(error);
  });



  }).catch(function(error){
    console.log(error);
  });



  
});



app.get("/", function(req,res){
  if(!isNaN(req.session.id))
    res.redirect("/users/"+req.session.id);
  else
  {
    res.redirect("/login");
  }
});

app.get("/users/:id/history", function(req, res){
  var userProbs;
  var quizzes;
  db.UserProblem.findAll({
    where:{
      UserId:req.params.id
    },
    order:[["createdAt", "DESC"]]
  }).then(function(userProblems){

    res.render("history", {problems:userProblems});

  });

});
///submitting a Quiz!!!!!

  //create a user quiz

      //inisde the promise,







}
// Export routes for server.js to use.
// module.exports = router;
