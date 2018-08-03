/**
* @name CommentComponent
* @extends
* @file commentComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class CommentComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'commentComponent';

		//Create html elements
		this.name = document.createElement('h4');
		this.hr = document.createElement('hr');
		this.body = document.createElement('p');

		//Add html elements
		this.container.appendChild(this.name);
		this.container.appendChild(this.hr);
		this.container.appendChild(this.body);

		//Add data to html elements
		this.name.innerHTML = this.model.name;
		this.body.innerHTML = this.model.body;
		//Add event to html elements
	}
}