class TodoComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);

		this.addTodoBtn = document.getElementById('addTodoBtn');
		this.ownerID = 1;
		
		if (this.model.userId === this.ownerID) {
			this.addTodoBtn.hidden = false;	
		}else{
			this.addTodoBtn.hidden = true;
		}

		this.container.className = 'todoComponent';

		//Create html elements
		this.title = document.createElement('h3');
		this.state = document.createElement('input');
		this.state.setAttribute("type", "checkbox");
		this.state.classList = 'completeState';
		this.hr = document.createElement('hr');
	

		if (model.completed === true) {
			this.state.checked = true;
		}else{
			this.state.checked = false;
		}
		

		//Add html elements
		this.container.appendChild(this.title);
		this.container.appendChild(this.state);
		this.container.appendChild(this.hr);

		//Add data to html elements
		this.title.innerHTML = this.model.title;
		//this.state.innerHTML = 'Competed: ' + this.model.state;



	}
}