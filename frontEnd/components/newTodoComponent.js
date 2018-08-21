class NewTodoComponent extends Component {
	constructor(model, parent, dataManager) {
        super(model, parent, dataManager);

        console.log(dataManager);
        
		this.dataManager = dataManager;

		this.container.getElementById = 'todosComponent';
		this.addNewTodoBtn = document.createElement('div');
		this.addNewTodoBtn.className = 'addNewTodoBTN';
		this.addNewTodoBtn.id = 'addTodoBtn';
		this.container.appendChild(this.addNewTodoBtn);

		this.form = document.getElementById('todoForm');
		this.title = document.getElementById('titleTodo');
		this.okBtn = document.getElementById('sendTodoBtn');
		this.cencelBtn = document.getElementById('cancelTodoBtn');

		this.form.hidden = true;

		this.addNewTodoBtn.onclick = this.showForm.bind(this);
		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cencelBtn.onclick = this.cancelBtnClick.bind(this);

	}

	showForm() {
		this.form.hidden = false;
	}

	okBtnClick(e) {

        this.todosCounter = this.dataManager.selectedBee.todos.length;
		this.todosCounter++;

		var todo = {
			userId: this.dataManager.selectedBee.id,
			id: this.todosCounter,
            title: this.title.value,
            completed: false
		}

		console.log(todo);

		this.dataManager.showSelectedBeeTodos(this.dataManager.selectedBee);
		this.dataManager.sendTodo(todo);
		e.preventDefault();
        this.cleanForm();
        this.form.hidden = true;
	}

	cancelBtnClick(e) {
		e.preventDefault();
		this.cleanForm();
		this.form.hidden = true;

	}

	cleanForm() {
		this.title.value = null;
	}
}