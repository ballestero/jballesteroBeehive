
class NavManager {

	constructor(dataManager) {
		this.dataManager = dataManager;
		this.beesComponent = document.getElementById('beesComponent');
		this.postsComponent = document.getElementById('postsComponent');
		this.todosComponent = document.getElementById('todosComponent');
		this.comentForm = document.getElementById('comentForm');
		this.todoForm = document.getElementById('todoForm');
		this.beeActivityComponent = document.getElementById('beeActivityComponent');
		this.postsComponent.hidden = true;
		this.todosComponent.hidden = true;
		this.todoForm.hidden = true;
		this.comentForm.hidden = true;
		this.ownerId = 1;

		
	}

	showBees() {
		this.dataManager.bees.forEach(bee => {
			var beeComponent = new BeeComponent(bee, this.beesComponent, this.dataManager);
		});
	}

	showBeePosts() {
		this.addPostBtn = document.getElementById('addPostBtn');
		this.addTodoBtn = document.getElementById('addTodoBtn');
		this.postsComponent.hidden = false;
		this.todosComponent.hidden = true;
		this.postsComponent.innerHTML = '';		

		if(this.addTodoBtn){	
		this.addTodoBtn.hidden = true;
		}
		
		if (this.addPostBtn === null) {
			if (this.dataManager.selectedBee.id === this.ownerId) {
				this.newPostComponent = new NewPostComponent(null, this.beeActivityComponent, this.dataManager);
			}
		}

		this.dataManager.selectedBee.posts.forEach(post => {
			var postComponent = new PostComponent(post, this.postsComponent, this.dataManager, this.comentForm);
		})
	}

	showBeeTodos() {
		this.addPostBtn = document.getElementById('addPostBtn');
		this.addTodoBtn = document.getElementById('addTodoBtn');
		this.postsComponent.hidden = true;
		this.todosComponent.hidden = false;
		this.todosComponent.innerHTML = '';
		this.addPostBtn.hidden =true;

		if (this.addTodoBtn === null) {
			if (this.dataManager.selectedBee.id === this.ownerId) {
				this.newTodoComponent = new NewTodoComponent(null, this.beeActivityComponent, this.dataManager);
			}
		}else{
			this.addTodoBtn.hidden = false;
		}
	
		this.dataManager.selectedBee.todos.forEach(todo => {
			var todoComponent = new TodoComponent(todo, this.todosComponent, this.dataManager);
		})
	}
}