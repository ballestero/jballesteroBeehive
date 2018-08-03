/**
* @name DataManager
* @extends
* @file dataManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class DataManager {
	/**
	* @param {data type} name - description.
	*/
	constructor() {
		this.bees = [];
		this.selectedBee = null;
		this.navManager = null;
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

	showSelectedBeePosts(bee) {
		this.selectedBee = bee;
		this.navManager.showBeePosts();
	}

	showSelectedBeeTodos(bee) {
		this.selectedBee = bee;
		this.navManager.showBeeTodos();
	}
}