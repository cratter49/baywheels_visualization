const User = require('../controllers/user');

module.exports = router => {
	router.post('/createUser', User.post);
	router.get('/getUser', User.get);
};