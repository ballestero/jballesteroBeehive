class NewPostComponent extends Component {
	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);

		this.dataManager = dataManager;


		this.container.getElementById = 'postsComponent';
		this.addNewPostBtn = document.createElement('div');
		this.addNewPostBtn.className = 'addNewPostBTN';
		this.addNewPostBtn.id = 'addPostBtn';
		this.container.appendChild(this.addNewPostBtn);

		this.form = document.getElementById('postForm');
		this.title = document.getElementById('titlePost');
		this.body = document.getElementById('bodyPost');
		this.okBtn = document.getElementById('sendPostBtn');
		this.cencelBtn = document.getElementById('cancelPostBtn');

		this.form.hidden = true;

		this.addNewPostBtn.onclick = this.showForm.bind(this);
		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cencelBtn.onclick = this.cancelBtnClick.bind(this);

	}

	showForm() {
		this.form.hidden = false;
	}

	okBtnClick(e) {

		this.postsCounter = this.dataManager.selectedBee.posts.length;
		this.postsCounter++;

		var post = {
			userId: this.dataManager.selectedBee.id,
			id: this.postsCounter,
			title: this.title.value,
			body: this.body.value,
			comments: []
		}

		console.log(post);


		this.dataManager.sendPost(post);

		this.dataManager.showSelectedBeePosts(this.dataManager.selectedBee);

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
		this.body.value = null;
	}
}