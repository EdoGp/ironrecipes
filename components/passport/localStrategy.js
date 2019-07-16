const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../../models/User');
const bcrypt = require('bcryptjs');

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username })
			.select('username firstName familyName email password')
			.then((user) => {
				if (!user) {
					done(null, false, { message: 'Incorrect username' });
					return;
				}
				if (!bcrypt.compareSync(password, user.password)) {
					done(null, false, { message: 'Incorrect password' });
					return;
				}
				done(null, user);
			})
			.catch((err) => done(err));
	}),
);
