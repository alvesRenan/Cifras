module.exports = function (app) {
	
	var Cifras = app.models.cifra;

	var controller = {};

	controller.home = function (req, res) {
		res.render('index');
	};

	controller.envia_cifra = function (req, res) {
		
		nova_cifra = new Cifras({
			nome: req.body.nome,
			artista: req.body.artista,
			cifra: req.body.cifra,
			user: req.body.user
		});

		//console.log(nova_cifra);

		nova_cifra.save(function (err) {
			if (err) {
				console.log(err);
				res.json({ error: "Houve um erro" });
			} else {
				controller.listar_cifras(req, res);
			}
		})
	};

	controller.listar_cifras = function (req, res) {
		//console.log(req);
		// console.log("User ----- " + req.session.user);
		
		Cifras.find({ user: req.session.user }, 
			function (err, cifras) {
				if (err) {
					console.log(err);
					res.json({ error: "Houve um erro" });
				} else {
					// console.log("Cifras ----- " + cifras);
					res.json(cifras);
				}
			}
		)
	};

	controller.atualiza_form = function (req, res) {
		
		Cifras.findById(req.params.id,
			function (err, cifra) {
				if (err) {
					res.json({ error: "Houve um error" });
				} else {
					res.json(cifra);
				}
			}
		);
	};

	controller.atualiza_salva = function (req, res) {
		
		Cifras.findByIdAndUpdate(req.body.id,
			{ $set:
				{
					nome: req.body.nome,
					artista: req.body.artista,
					cifra: req.body.cifra
				}
			}, function (err) {
				if (err) {
					res.json({ error: "Houve um erro" });
				} else {
					controller.listar_cifras(req, res);
				}
			}
		)
	};

	controller.deleta = function (req, res) {
		
		Cifras.remove({ _id: req.params.id },
			function (err) {
				if (err) {
					res.json({ error: "Houve um erro" });
				} else {
					controller.listar_cifras(req, res);
				}
			}
		)
	};

	controller.mostra_cifra = function (req, res) {
		
		//console.log(req)
		Cifras.findById({ _id: req.params.id },
			function (err, cifra) {
				if (err) {
					res.json({ error: "Houve um erro" });
				} else {
					res.json(cifra);
				}
			}
		)
	};

	controller.procura_cifra = function (req, res) {
		
		Cifras.find({ nome: { '$regex' : req.params.busca, '$options' : 'i' } },
			function (err, cifras) {
				if (err) {
					res.json({ error: "Houve um erro" });
				} else {
					res.json(cifras);
				}
			}
		)
	};

	controller.wrong_way = function (req, res) {
		controller.home(req, res);
	}

	return controller;
};