const bcrypt = require('bcryptjs');
const User = require('./../../models/User');

exports.profileGet = async (req, res, next) => {};
exports.profilePut = async (req, res, next) => {
	req.body.image = req.file.url;
	await User.findByIdAndUpdate(req.user._id, req.body);
	res.redirect('/profile');
};
exports.logout = async (req, res, next) => {
	if (req.user === undefined) {
		res.redirect('/');
		return;
	}
	req.user.set({ loggedIn: false });
	req.user
		.save()
		.then(() => {
			req.logout();
			res.redirect('/');
			// res.json({ status: 'success' });
		})
		.catch((err) => {
			next(err);
		});
};
exports.signup = async (req, res, next) => {
	const bcryptSalt = 10;
	const userInfo = { ...req.body };
	if (userInfo.username === '' || userInfo.password === '') {
		res.status(401).json({
			status: 'failed',
			message: 'Please fill username and password',
		});
		return;
	}
	try {
		User.findOne({
			$or: [{ username: userInfo.username }, { email: userInfo.email }],
		})
			.then((user) => {
				if (user !== null) {
					req.flash(
						'error',
						'Username or email already taken, please choose a different one',
					);
					res.status(401).json({
						status: 'failed',
						message:
							'Username already taken, please choose a different username',
					});
				} else {
					const salt = Number(bcrypt.genSalt(bcryptSalt));
					userInfo.password = bcrypt.hashSync(userInfo.password, salt);
					const newUser = new User(userInfo);
					newUser.save((err) => {
						if (err) {
							req.flash('error', 'Something went wrong saving the user');
							next(err);
						} else {
							res.status(201).json({ status: 'success' });
							res.redirect('/');
							req.login(newUser, (err) => {
								if (err) {
									next(err);
								} else {
									newUser.set({ loggedIn: true });
								}
							});
						}
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (error) {
		res.status(500).json({ status: 'fail', error });
	}
};
