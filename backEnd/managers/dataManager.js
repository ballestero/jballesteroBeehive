
var fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

var dataManager = {
	path: '../backend/data/'
};

dataManager.load = function (name) {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(process.cwd(), this.path + name + '.json'), (err, data) => {
			if (err) {
				reject(err);
			} else {
				var json = JSON.parse(data);
				resolve(json);
			}
		});
	});
}

dataManager.save = function (model, name) {
	return new Promise((resolve, reject) => {
		this.load(name).then((data) => {

			model.id = uniqid();
			data.push(model);

			fs.writeFile(path.resolve(process.cwd(), this.path + name + '.json'), JSON.stringify(data), (err) => {
				if (err) {
					reject(err)
				} else {
					resolve();
				}
			});
		}).catch((err) => {
			console.log('Error loading posts on save.', err);
		});
	});
}

dataManager.saveFile = function (data, name) {
	console.log('DM 50 ' + this.path + '+' + name );
	
	return new Promise((resolve, reject) => {
		fs.writeFile(path.resolve(process.cwd(), this.path + name + '.json'), JSON.stringify(data), (err) => {
			if (err) {
				reject(err)
			} else {
				resolve();
			}
		});
	});
}



module.exports = dataManager;