var principal = new Vue({
	el: '#principal',

	data: {
		cifras: [],
		loged: false,
		user: '',
		minhas_cifras: false,
		id: '',
		hello: true,
		busca_cifra: ''
				//controle: true
			},

	methods: {
		home () {
			principal.busca_cifra = '';
			principal.hello = true;
			principal.minhas_cifras = false;
		},

		///// Login e Cadastro de usuários - Inicio //////
		login () {
			var user = $('#login-modal #user_name').val().trim(),
			senha = $('#login-modal #user_passwd').val().trim();

			//console.log("Login = " + "USER: " + user + ' ' + "SENHA: " + senha);
			
			axios.post('/login', {
				user: user,
				senha: senha
			})
			.then( function (response) {
				if (response.data.error == false) {
					$('#login-modal').modal('toggle');

					principal.loged = true;
					principal.user = user;
				} else {
					alert('Usuário não cadastrado ou senha inválida!');
				}
				
				$('#login-modal #user_name').val("");
				$('#login-modal #user_passwd').val("");
			})

		},

		logout () {
			axios.get('/logout')
			.then( function () {
				principal.loged = false;
				principal.minhas_cifras = false; 
				principal.cifras = [];
				principal.busca_cifra = '';

			});
		},

		cadastrar () {
			var user = $('#login-modal #user_name').val().trim(),
			senha = $('#login-modal #user_passwd').val().trim();

			//console.log("Cadastro = " + "USER: " + user + ' ' + "SENHA: " + senha);

			axios.post('/cadastra', {
				user: user,
				senha: senha
			})
			.then(function (response) {
				var error = response.data.error;

				if (error == false) {
					$('#login-modal').modal('toggle');

					principal.loged = true;
					principal.user = user;
				} else {
					alert("Usuário e senha devem ser únicos! Use a opção entrar ou crie um usuário diferente.");
				};

				$('#login-modal #user_name').val("");
				$('#login-modal #user_passwd').val("");
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		///// Login e Cadastro de usuários - Fim //////


		envia_cifra () {
			var nome = $('#envia-cifra-modal #nome-musica').val().trim(),
			artista = $('#envia-cifra-modal #artista').val().trim(),
			cifra = $('#envia-cifra-modal #cifra').val().trim();

			//console.log(nome + '\n' + artista + '\n' + cifra + '\n' + this.user)
			axios.post('/envia_cifra', {
				nome: nome,
				artista: artista,
				cifra: cifra,
				user: this.user
			})
			.then(function (response) {
				if (response.data.error == undefined) {
					alert('Cifra enviado com sucesso!')
					
					$('#envia-cifra-modal').modal('toggle');
					principal.cifras = response.data;
					principal.minhas_cifras = true;
				} else {
					alert('Algo deu errado...')
				};
			})
			.catch(function (error) {
				console.log(error)
			});

			$('#envia-cifra-modal #nome-musica').val('');
			$('#envia-cifra-modal #artista').val('');
			$('#envia-cifra-modal #cifra').val('')
		},

		listar_cifras () {
			axios.get('/listar_cifras')
			.then(function (response) {
				if (response.data.error == undefined) {
					$('#minha-conta-modal').modal('toggle');
					principal.hello = false;
					principal.cifras = response.data;
					principal.minhas_cifras = true;

					//console.log(principal.cifras)
				} else {
					alert('Sem cifras para mostrar.');
				}
			})
			.catch(function (error) {
				console.log(error)
			});
		},

		start_update (id) {
			axios.get('/cifras/atualiza/' + id)
			.then(function (response) {
				$('#update-cifra-modal #nome-musica').val(response.data.nome);
				$('#update-cifra-modal #artista').val(response.data.artista);
				$('#update-cifra-modal #cifra').val(response.data.cifra);

				principal.id = id;
			})
			.catch(function (error) {
				console.log(error)
			});
		},

		update_cifra () {
			var nome = $('#update-cifra-modal #nome-musica').val().trim(),
			artista = $('#update-cifra-modal #artista').val().trim(),
			cifra = $('#update-cifra-modal #cifra').val().trim();

			axios.post('/cifras/atualiza',{
				id: principal.id,
				nome: nome,
				artista: artista,
				cifra: cifra
			})
			.then(function (response) {
				if (response.data.error == undefined) {
					$('#update-cifra-modal').modal('toggle');
					principal.cifras = response.data;
					principal.minhas_cifras = true;

					//console.log(principal.cifras)
				} else {
					alert('Sem cifras para mostrar.');
				}
			})
			.catch(function (error) {
				console.log(error)
			});
		},

		delete_cifra (id, nome) {
			var confirma = confirm("Tem certeza que desja deletar a cifra: " + nome);
			if (confirma == true) {
				axios.delete('/cifras/' + id)
				.then(function (response) {
					if (response.data.error == undefined) {
						principal.cifras = response.data;
						principal.minhas_cifras = true;
					} else {
						alert('Sem cifras para mostrar')
					}
				})
				.catch(function (error) {
					console.log(error)
				})
			}
		},

		mostra_cifra (id) {
			axios.get('/cifras/' + id)
			.then(function (response) {
				if (response.data.error == undefined) {
					$('#display-cifra-modal #nome-musica').val(response.data.nome);
					$('#display-cifra-modal #artista').val(response.data.artista);
					$('#display-cifra-modal #cifra').val(response.data.cifra);

				} else {
					alert('Houve um erro')
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		},

		procura_cifra () {
			axios.get('/cifras/busca/' + principal.busca_cifra)
			.then(function (response) {
				principal.hello = false;

				if (response.data.error == undefined) {
					principal.cifras = response.data;
				} else {
					principal.cifras = [];
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		}
	}
})