var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');

const localStrategy = require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate()));

router.get('/',function(req, res, next) {
   res.render('index', { title: 'Express'});
});

router.get('/profile', isLoggedIn, function(req, res, next) {
   res.render("profile");
});

router.post("/register",function(req, res, next) {
   const { username, email } = req.body;
   const userData = new userModel({ username, email });

   userModel.register(userData, req.body.password)
   .then(function(){
      passport.authenticate("local")(req, res, function(){
         res.redirect("/profile");
      })
   })
});

router.post("/login", passport.authenticate("local", {
   successRedirect: "/profile",
   failureRedirect: "/"
}), function(req, res, next) {
   
});

router.get("/logout", function(req, res){
   req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
})

function isLoggedIn(req, res, next){
   if(req.isAuthenticated()) return next();
   res.redirect("/");
}
module.exports = router;