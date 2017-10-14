// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
// var express = require("express");
// var session = require('express-session');
// var app = express();
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { }//secure: true 
// }));
// Routes
// =============================================================
module.exports = function(app) {
var curr;
app.get("/login", function(req,res){
    curr=0;
    res.render("index");
  });
  // GET route for getting all of the users
  app.get("/api/users/", function(req, res) {
    db.User.findAll({})
    .then(function(dbUsers) {
      // console.log(dbUsers);
      res.json(dbUsers);
    }).catch();
  });
  app.post("/api/users", function(req, res){
    db.User.findOne({
      where:{
        email:req.body.email
      }
    }).then(function(u){
      if(u){
        res.redirect("/login");
      }
      else{
        db.User.create(req.body).then(function(user){
      curr = user.id;
      res.redirect("/home");
    });
      }
    });
    
  });

  // Get rotue for retrieving a single user
  //how to return appropriate codes?????
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbUser) {
      res.json(dbUser);
    }).catch(function(error){
      res.json(
        error.toString()
      );
    });
  });
  app.get("/home", function(req, res){
    if(curr>0){
      res.redirect("/users/"+curr);
    }
    else{
      res.redirect("/login");
    }
  });
  app.post("/quizzes/:id/submit", function(req, res){
    var keys = Object.keys(req.body);
    var answers=req.body;
    var numCorrect=0;
    var Problem;
    scorecursion(keys, answers, 0, 0);
      res.redirect("/home");
    
    // for(var i= 0; i < keys.length; i++){

    //   db.Problem.findOne({
    //     where:{
    //       id: parseInt(keys[i])
    //     }
    //   }).then(function(prob){
    //     var correct=false;
        
    //     if(answers[prob.id] == prob.correctAnswer){
    //       correct=true;
    //       numCorrect++;
          
    //     }
    //     db.UserProblem.create({
    //        correct:correct,
    //        QuizId: prob.QuizId,
    //        UserId:curr
    //     });

    //   });


      
    // }
    // console.log(numCorrect);
    
  });
  //should prob be in html-routes..
    app.post("/home", function(req, res) {

    // console.log("you made it");
      var user = req.body;
      
      var dbUser = db.User.findOne({
        where: {email: user.email, password: user.password}
      }).then(function(dbUser){
        if(dbUser){
          curr=dbUser.id;
          res.render("home", {user: dbUser});
        }
        else{
          res.render("index");
        }
        
      }).catch(function(error){
        console.log(error);
      });

      
  });
  app.delete("/api/users/:id", function(req, res){
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUser){
        console.log(dbUser);

        res.json(dbUser);
      }).catch(function(error){
        res.json(error.toString());
      });
  });
  app.delete("/api/users/", function(req, res){
      db.User.destroy({
        where: {},
        truncate: true
        

      }).then(function(dbUser){
        console.log(dbUser);

        res.json(dbUser);
      }).catch(function(error){
        res.json(error.toString());
      });
  });
//-------
  app.get("/api/lessons/", function(req, res){
    db.Lesson.findAll({}).then(function(dbLesson){
      // console.log(dbLesson);
      res.json(dbLesson);
    }).catch();
  });


app.get("/api/lessons/:id", function(req, res) {
    db.Lesson.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbLesson) {
      res.json(dbLesson);
    }).catch(function(error){
      res.json(
        error.toString()
      );
    });
  });


app.post("/api/lessons", function(req, res) {
      db.Lesson.create(req.body)
      .then(function(dbLesson) {

        res.json(dbLesson);
      }).catch(function(error){
        throw error;
        res.json(error.toString());
      });
  });

app.delete("/api/lessons/:id", function(req, res){
      db.Lesson.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbLesson){
        console.log(dbLesson);

        res.json(dbLesson);
      }).catch(function(error){
        res.json(error.toString());
      });
  });
app.delete("/api/lessons/", function(req, res){
      db.Lesson.destroy({
        where: {},
        truncate: true
        

      }).then(function(dbLesson){
        console.log(dbLesson);

        res.json(dbLesson);
      }).catch(function(error){
        res.json(error.toString());
      });
  });

//----

app.get("/api/quizzes/", function(req, res){
    db.Quiz.findAll({}).then(function(dbQuiz){
      // console.log(dbLesson);
      res.json(dbQuiz);
    }).catch();
  });

app.get("/api/quizzes/:id", function(req, res) {
    db.Quiz.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbQuiz) {
      res.json(dbQuiz);
    }).catch(function(error){
      res.json(
        error.toString()
      );
    });
  });
app.post("/api/quizzes", function(req, res) {
      db.Quiz.create(req.body)
      .then(function(dbQuiz) {
        res.json(dbQuiz);
      }).catch(function(error){
        res.json(error.toString());
      });
  });


//========
app.get("/api/problems/", function(req, res){
    db.Problem.findAll({order:[["QuizId", "ASC"]]}).then(function(dbProblem){
      // console.log(dbLesson);
      res.json(dbProblem);
    }).catch();
  });


///--------------need to add order
app.get("/api/userProblems/", function(req, res){

    db.UserProblem.findAll({}).then(function(dbUserProblem){
      // console.log(dbLesson);
      res.json(dbUserProblem);
    }).catch();

  });
app.post("/api/userProblems/", function(req, res){
    db.UserProblem.create(req.body)
      .then(function(dbUserProblem) {
        res.json(dbUserProblem);
      }).catch(function(error){
        res.json(error.toString());
      });
    });
//======need to add order
app.get("/api/userQuizzes/", function(req, res){
    db.UserQuiz.findAll({}).then(function(dbUserQuiz){
      // console.log(dbLesson);
      res.json(dbUserQuiz);
    }).catch();
  });
app.post("/api/userQuizzes/", function(req, res){
    db.UserQuiz.create(req.body)
      .then(function(dbUserQuiz) {
        res.json(dbUserQuiz);
      }).catch(function(error){
        res.json(error.toString());
      });
  });




app.post("/quizzes/:quizId/", function(req, res){
  //get current user and pass it in the create objects

  db.UserQuiz.create({
    UserId:req.session.userId, 
    QuizId:req.params.quizId
  }).then(function(dbUserQuiz){
    res.json(dbUserQuiz);
  }).catch(function(error){
    res.json(error.toString());
  });
});

var scorecursion = function(keys, answers, i, numCorrect){
  console.log(keys);
  console.log(answers);
  console.log(i);
  console.log(numCorrect);
  if(i == keys.length){

    var score= numCorrect*100/keys.length;
    console.log("score:" + score);

    return score;
  }
  else{
    db.Problem.findOne({
        where:{
          id: parseInt(keys[i])
        }
      }).then(function(prob){
        var correct=false;
        
        if(answers[prob.id] == prob.correctAnswer){
          correct=true;
          numCorrect++;
          
        }
        if(curr>0){
        db.UserProblem.create({
           correct:correct,
           QuizId: prob.QuizId,
           UserId:curr,
           ProblemId:prob.id,
           question:prob.question,
           correctAnswer:prob.correctAnswer
        });
}

        scorecursion(keys, answers, i+1, numCorrect)
      });
  }
}
};



