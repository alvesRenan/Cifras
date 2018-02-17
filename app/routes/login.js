module.exports = function (app) {
	
	var controller = app.controllers.login;

	app.post('/login', controller.login);
	
	app.post('/cadastra', controller.cadastra);

	app.get('/logout', controller.logout)
}