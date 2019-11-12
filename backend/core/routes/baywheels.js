const BayWheels = require('../controllers/baywheels');

module.exports = router => {
	router.get('/getData', BayWheels.get);
};