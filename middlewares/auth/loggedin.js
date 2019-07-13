exports.isUserLogged = (req, res, next) => {
	if (req.user) {
		return next();
	} else {
		res.status(401).redirect('/');
	}
};

exports.isUserLoggedAPI = (req, res, next) => {
	if (req.user) {
		return next();
	} else {
		res
			.status(401)
			.json({ status: 'failed', message: 'User is not logged in ' });
	}
};
