/**
* @name BeeComponent
* @extends
* @file beeComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class BeeComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'beeComponent';

		//Create html elements
		this.infoContainer = document.createElement('div');
		this.photo = document.createElement('div');
		this.name = document.createElement('h2');
		this.userName = document.createElement('span');
		this.email = document.createElement('span');
		this.phone = document.createElement('span');
		this.city = document.createElement('span');
		this.postBtn = document.createElement('button');
		this.todosBtn = document.createElement('button');

		//Add html elements
		
		this.container.appendChild(this.photo);
		this.container.appendChild(this.infoContainer);
		this.infoContainer.appendChild(this.name);
		this.infoContainer.appendChild(this.userName);
		this.infoContainer.appendChild(this.email);
		this.infoContainer.appendChild(this.phone);
		this.infoContainer.appendChild(this.city);
		this.infoContainer.appendChild(this.postBtn);
		this.infoContainer.appendChild(this.todosBtn);

		//Add data to html elements
		this.name.innerHTML = this.model.name;
		this.userName.innerHTML = 'Username: '+this.model.username;
		this.email.innerHTML = 'Email: '+this.model.email;
		this.phone.innerHTML = 'Phone: ' +this.model.phone;
		this.city.innerHTML = 'City: ' + this.model.address.city;
		this.postBtn.innerHTML = 'POSTS';
		this.todosBtn.innerHTML = 'TODOS';
		this.postBtn.classList = 'trjBtn postBtn';
		this.todosBtn.classList = 'trjBtn todoBtn';
		this.photo.classList = 'userPhoto';
		this.infoContainer.classList = 'infoContainer';

		//Add event to html elements
		this.postBtn.onclick = this.postBtnClick.bind(this);
		this.todosBtn.onclick = this.todosBtnClick.bind(this);
	}

	postBtnClick(e) {
		this.dataManager.showSelectedBeePosts(this.model);
	}

	todosBtnClick(e) {
		this.dataManager.showSelectedBeeTodos(this.model);
	}
}