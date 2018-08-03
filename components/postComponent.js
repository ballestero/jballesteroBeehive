/**
* @name PostComponent
* @extends
* @file postComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class PostComponent extends Component {

	constructor(model, parent, dataManager,comentForm) {
		super(model, parent, dataManager,comentForm);
		this.container.className = 'postComponent';
		this.comentForm = comentForm;

		//Create html elements
		this.title = document.createElement('h3');
		this.hr = document.createElement('hr');
		this.body = document.createElement('p');
		this.comentCounter = document.createElement('div');
		this.comentTxt = document.createElement('span');
		this.addCommentBtn = document.createElement('div');

		//Add html elements
		this.container.appendChild(this.title);
		this.container.appendChild(this.hr);
		this.container.appendChild(this.body);
		this.container.appendChild(this.comentCounter);
		this.comentCounter.appendChild(this.comentTxt);
		this.comentCounter.appendChild(this.addCommentBtn);

		//Add data to html elements
		this.title.innerHTML = this.model.title;
		this.body.innerHTML = this.model.body;
		this.comentTxt.innerHTML =  this.model.comments.length +' COMENTS  ';

		//Add event to html elements
		this.addCommentBtn.onclick = this.showComentForm.bind(this);
		this.comentCounter.classList = 'comentCounter';
		this.addCommentBtn.classList = 'addComentBtn';

		this.addComments();


	}

	addComments() {
		this.model.comments.forEach(comment => {
			var commentComponent = new CommentComponent(comment, this.container, this.dataManager);
		});
	}

	showComentForm() {
		this.comentForm.hidden = false;

		this.sendBtn = document.getElementById('sendBtn');
		this.cancelBtn = document.getElementById('cancelBtn');
		this.sendBtn.onclick = this.addCommentBtnClick.bind(this);
		this.cancelBtn.onclick = this.hideForm.bind(this);
	}

	addCommentBtnClick(){
		this.name = document.getElementById('titleComent');
		this.bodyComent = document.getElementById('bodyComent');

		console.log(this.model.comments);
		var comment = { postId: this.model.id, id: 0, name: this.name.value, email: "Laurie@lincoln.us", body: this.bodyComent.value };
		this.model.comments.push(comment);
		this.dataManager.navManager.showBeePosts();
		this.name.value = null;
		this.bodyComent.value = null;
		this.comentForm.hidden = true;
	}

	hideForm(){

		this.name = document.getElementById('titleComent');
		this.bodyComent = document.getElementById('bodyComent');

		this.name.value = null;
		this.bodyComent.value = null;
		this.comentForm.hidden = true;
	}
}