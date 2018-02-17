module.exports = function (app) {
	
	var Login = app.models.login,
		hash = require("object-hash"),
		controller = {};

	controller.login = function (req, res) {

		Login.findOne({ nome: req.body.user, hash: hash(req.body.senha) },
			function (err, user) {
				if (err) return handleError(err);

				if (user) {
					req.session.user = user.nome;
					res.json({ error: false });
				} else {
					res.json({ error: "Houve um erro" });
				}
			}
		)
	};

	controller.cadastra = function (req, res) {

		var user = req.body.user,
			senha = hash(req.body.senha),
			novo_usuario = new Login({ nome: user, hash: senha });

		//console.log(novo_usuario)

		novo_usuario.save(function (err) {
			if (err) {
				console.log(err);
				res.json({ error: "Houve um erro" });
			} else {
				req.session.user = user;
				res.json({ error: false });
			}
		})
	};

	controller.logout = function (req, res) {

		try {
			req.session.destroy();
			res.redirect('/#');
		} catch(err) {
			res.json({ error: "Houve um erro" });
		}
	};

	return controller;
};