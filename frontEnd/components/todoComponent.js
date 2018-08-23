class TodoComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.dataManager = dataManager;
		this.addTodoBtn = document.getElementById('addTodoBtn');
		this.ownerID = 1;

		if (this.model.userId === this.ownerID) {
			this.addTodoBtn.hidden = false;
		} else {
			this.addTodoBtn.hidden = true;
		}

		console.log(this.model.id);


		this.container.className = 'todoComponent';

		//Create html elements
		this.title = document.createElement('h3');
		this.state = document.createElement('input');
		this.deleteBtn = document.createElement('div');
		this.hr = document.createElement('hr');

		//Add html elements
		this.container.appendChild(this.title);
		this.container.appendChild(this.state);
		if (this.model.userId === this.ownerID) {
			this.container.appendChild(this.deleteBtn);
		}
		this.container.appendChild(this.hr);

		//Add data to html elements
		this.title.innerHTML = this.model.title;
		this.state.type = "checkbox";
		this.state.id = 'completeState';
		this.deleteBtn.in = this.model.id;
		this.deleteBtn.classList = 'deleteBtn';
		this.state.classList = 'completeState';


		if (this.model.completed === true) {
			this.state.checked = true;
			this.state.disabled = true;
		} else {
			this.state.onchange = this.isCompletedOnCheck.bind(this);
		}

		//this.clickdelete = document.getElementById(this.model.id);
		this.deleteBtn.onclick = this.actionDelete.bind(this);
		//this.clickdelete.addEventListener("click", this.actionDelete());

	}

	isCompletedOnCheck() {
		this.model.completed = true;
		this.state.checked = true;
		this.state.disabled = true;
		this.dataManager.patchTodo(this.model);
	}

	actionDelete() {
		
		let msj = confirm("You want delete this todo?");
		if (msj) {
		
			console.log('Delete: ' +this.model.id);
			this.dataManager.deleteTodo(this.model.id);
		} else {
			console.log('No delete: '+ this.model.id);
		}

	}

}

