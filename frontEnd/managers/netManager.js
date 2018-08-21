
class NetManager {
	constructor(dataManager, navManager) {
		this.url = 'http://localhost:3500/';
		this.dataManager = dataManager;
		this.navManager = navManager;
		this.getUsers();
	}

	//Get Methods
	getUsers() {
		var request = new XMLHttpRequest();
		//request.open('GET', './data/users.json', true);
		request.open('GET', this.url + 'users', true);
		request.onreadystatechange = this.getUsersCallback.bind(this);
		request.send();
	}

	getUsersCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				//console.log(this);
				var bees = JSON.parse(request.responseText);

				for (const id in bees) {
					this.dataManager.bees.push(bees[id]);
				}

				this.getPosts();
				this.getTodos();
				this.navManager.showBees();

			} else {
				console.log('Error on request');
			}
		}
	}

	getPosts() {
		var request = new XMLHttpRequest();
		// request.open('GET', './data/posts.json', true);
		request.open('GET', this.url + 'posts', true);
		request.onreadystatechange = this.getPostCallback.bind(this);
		request.send();
	}

	getPostCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {

				var posts = JSON.parse(request.responseText);

				for (const id in posts) {
					//Adds an attribute comments to the object post
					if (posts[id]) {
						posts[id].comments = [];
						this.dataManager.addPostToBee(posts[id]);
					}
				}

				this.getComments();
			} else {
				console.log('Error on request');
			}
		}
	}

	getComments() {
		var request = new XMLHttpRequest();
		//request.open('GET', './data/comments.json', true);
		request.open('GET', this.url + 'comments', true);
		request.onreadystatechange = this.getCommentsCallback.bind(this);
		request.send();
	}

	getCommentsCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {

				var comments = JSON.parse(request.responseText);

				for (const id in comments) {
					this.dataManager.addCommentToPost(comments[id]);
				}

				//HACK
				this.dataManager.user = this.dataManager.bees[0];
				this.dataManager.selectedBee = this.dataManager.bees[0];
				this.navManager.showBeePosts();

			} else {
				console.log('Error on request');
			}
		}
	}

	getTodos() {
		var request = new XMLHttpRequest();
		//request.open('GET', './data/todos.json', true);
		request.open('GET', this.url + 'todos', true);
		request.onreadystatechange = this.getTodosCallback.bind(this);
		request.send();
	}

	getTodosCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {

				var todos = JSON.parse(request.responseText);

				for (const id in todos) {
					this.dataManager.addTodosToBee(todos[id]);
				}

			} else {
				console.log('Error on request');
			}
		}
	}

	//Post Methods
	sendPost(post) {
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'posts', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.sendPostCallback.bind(this, post);
		request.send(JSON.stringify(post));
	}

	sendPostCallback(post, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {

				//Actualizar el UI
				this.dataManager.user.posts.push(post);
				this.navManager.showBeePosts();
			}
			else {
				console.log('Error on request');
			}
		}
	}

	sendComment(post, comment) {
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'comments', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.sendCommentCallback.bind(this, post, comment);
		request.send(JSON.stringify(comment));
	}

	sendCommentCallback(post, comment, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {

				post.comments.push(comment);
				this.navManager.showBeePosts();
			}
			else {
				console.log('Error on request');
			}
		}
	}

	sendTodo(todo) {
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'todos', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.sendTodoCallback.bind(this, todo);
		request.send(JSON.stringify(todo));
	}

	sendTodoCallback(todo, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				console.log(todo);

				this.dataManager.user.todos.push(todo);
				
				this.navManager.showBeeTodos();
			}
			else {
				console.log('Error on request');
			}
		}
	}

	//Patch Methods
	patchPost() {

	}

	patchTodo(todo) {
		var request = new XMLHttpRequest();
		request.open('PATCH', this.url + 'todos', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.patchTodoCallback.bind(this, todo);
		request.send(JSON.stringify(todo));
	}

	patchTodoCallback(todo, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				this.dataManager.user.todos.push(todo);
				
				this.navManager.showBeeTodos();
			}
			else {
				console.log('Error on request');
			}
		}
	}

}