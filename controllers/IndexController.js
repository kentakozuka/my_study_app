var IndexController = function(app){

	//Modules
	var connection = require('../mysqlConnection'); 

	//　ルートにアクセスした場合のルーティング
	app.get('/', function(req, res) {
		//文字列を返す
		res.send('hello world');
	});

};
module.exports = IndexController
