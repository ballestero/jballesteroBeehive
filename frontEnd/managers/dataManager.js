
class DataManager {

	constructor() {
		this.bees = [];
		this.selectedBee = null;
		this.navManager = new NavManager(this);
		this.netManager = new NetManager(this, this.navManager);
	
	}

	addPostToBee(post) {
		this.bees.forEach(bee => {
			if (bee.id == post.userId) {
				if (bee.posts) {
					bee.posts.push(post);
					return;
				} else {
					bee.posts = [];
					bee.posts.push(post);
					return;
				}
			}
		});
	}

	addCommentToPost(comment) {
		this.bees.forEach(bee => {
				bee.posts.forEach(post => {
					if (post.id == comment.postId) {
						if (post.comments) {
							post.comments.push(comment);
						} else {
							post.comments = [];
							post.comments.push(comment);
						}
					}
				});
		});
	}

	addTodosToBee(todo) {
		this.bees.forEach(bee => {
			if (bee.id == todo.userId) {
				if (bee.todos) {
					bee.todos.push(todo);
					return;
				} else {
					bee.todos = [];
					bee.todos.push(todo);
					return;
				}
			}
		});
	}

	

	showSelectedBeePosts(bee) {
		this.selectedBee = bee;
		this.navManager.showBeePosts();
	}

	showSelectedBeeTodos(bee) {
		this.selectedBee = bee;
		this.navManager.showBeeTodos();
	}

	sendPost(post) {
		this.netManager.sendPost(post);
	}

	deletePost(id) {
		this.netManager.deletePost(id);
	}

	sendComment(post, comment) {
		this.netManager.sendComment(post, comment);
	}

	sendTodo(todo) {
		this.netManager.sendTodo(todo);
	}

	patchTodo(todo) {
		this.netManager.patchTodo(todo);
	}
	deleteTodo(id) {
		
		this.netManager.deleteTodo(id);
		
	}
}