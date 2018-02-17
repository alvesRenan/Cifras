module.exports = function (app) {
	
	var controller = app.controllers.cifras;
	
	app.get('/', controller.home);

	app.post('/envia_cifra', controller.envia_cifra);

	app.get('/listar_cifras', controller.listar_cifras);

	app.get('/cifras/atualiza/:id', controller.atualiza_form);
	app.post('/cifras/atualiza', controller.atualiza_salva);

	app.delete('/cifras/:id', controller.deleta);

	app.get('/cifras/:id', controller.mostra_cifra);

	app.get('/cifras/busca/:busca', controller.procura_cifra);

	app.get("/*", controller.wrong_way);
};