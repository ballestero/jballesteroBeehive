class TodoComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);

		this.addTodoBtn = document.getElementById('addTodoBtn');
		this.ownerID = 1;

		if (this.model.userId === this.ownerID) {
			this.addTodoBtn.hidden = false;
		} else {
			this.addTodoBtn.hidden = true;
		}

		this.container.className = 'todoComponent';

		//Create html elements
		this.title = document.createElement('h3');
		this.state = document.createElement('input');
		this.hr = document.createElement('hr');

		//Add html elements
		this.container.appendChild(this.title);
		this.container.appendChild(this.state);
		this.container.appendChild(this.hr);

		//Add data to html elements
		this.title.innerHTML = this.model.title;
		this.state.type = "checkbox";
		this.state.id = 'completeState';
		this.state.classList = 'completeState';


		if (this.model.completed === true) {
			this.state.checked = true;
			this.state.disabled = true;
		} else {
			this.state.onchange = this.isCompletedOnCheck.bind(this);
		}

	}

	isCompletedOnCheck() {
		this.model.completed = true;
		this.state.checked = true;
		this.state.disabled = true;
		this.dataManager.patchTodo(this.model);
	}
}