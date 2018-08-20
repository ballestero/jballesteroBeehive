/**
* @name NetManager
* @extends
* @file netManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NetManager {
	constructor(dataManager, navManager) {
		this.dataManager = dataManager;
		this.navManager = navManager;
	}

	init() {
		this.requestUsers();
	}

	requestUsers() {
		var request = new XMLHttpRequest();
		request.open('GET', './data/users.json', true);
		request.onreadystatechange = this.requestUsersCallback.bind(this);
		request.send();
	}

	requestUsersCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				//console.log(this);
				var bees = JSON.parse(request.responseText);
				for (const id in bees) {
					this.dataManager.bees.push(bees[id]);
				}

				this.requestPosts();
				this.requestTodos();
				this.navManager.showBees();

			} else {
				console.log('Error on request');
			}
		}
	}

	requestPosts() {
		var request = new XMLHttpRequest();
		request.open('GET', './data/posts.json', true);
		request.onreadystatechange = this.requestPostCallback.bind(this);
		request.send();
	}

	requestPostCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var posts = JSON.parse(request.responseText);
				for (const id in posts) {
					this.dataManager.addPostToBee(posts[id]);
				}
				this.requestComments();
			} else {
				console.log('Error on request');
			}
		}
	}

	requestComments() {
		var request = new XMLHttpRequest();
		request.open('GET', './data/comments.json', true);
		request.onreadystatechange = this.requestCommentsCallback.bind(this);
		request.send();
	}

	requestCommentsCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var comments = JSON.parse(request.responseText);
				for (const id in comments) {
					this.dataManager.addCommentToPost(comments[id]);
				}

				//HACK
				this.dataManager.selectedBee = this.dataManager.bees[0];
				this.navManager.showBeePosts();

			} else {
				console.log('Error on request');
			}
		}
	}

	requestTodos() {
		var request = new XMLHttpRequest();
		request.open('GET', './data/todos.json', true);
		request.onreadystatechange = this.requestTodosCallback.bind(this);
		request.send();
	}

	requestTodosCallback(e) {
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
}