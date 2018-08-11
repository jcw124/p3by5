
var Admin = require("../models/Admin.js");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use('admin-local', new LocalStrategy(
	// Our user will sign in using an email, rather than a "username"
	{
		usernameField: "username",
		passwordField: 'password'
	},
	function (username, password, done) {
		var newAdmin = new Admin();
		Admin.findOne({ 'username': username })
			.then(function (dbAdmin) {

				if (!dbAdmin) {
					return done(null, false);
				}

				if (newAdmin.validPassword(password, dbAdmin.password)) {
					console.log("FUCKING AUTHENTICATED");
					return done(null, dbAdmin);
				}
				return done(null, false);
			})
			.catch(function (err) {
				return done(err);
			});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});


// Exporting our configured passport
module.exports = passport;