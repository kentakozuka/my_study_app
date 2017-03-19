var EditUserController = function(app){

	//Modules
	var connection = require('../mysqlConnection'); 

	// パス/edit_userにアクセスした場合のルーティング
	app.get('/edit_user', function(req, res) {
    	res.render('edit_user');
	});

	// /create_examにPOSTした場合の処理
	app.post('/create_user', function(req, res) {
		console.log(req.body);
		//インサートするテーブル名
		var table = 'USER';
		//フィールド
		var fields  = {
			USER_NAME: req.body.user_name
		,	USER_PASSWORD: req.body.user_password
		};
		connection.query(
			'INSERT INTO' + ' ' + table +' '+ 'SET ?'
		,	fields
		,	function(err, result){
				//ERROR
				if (err) {
					// 接続失敗
					console.log("レコードのインサートに失敗しました。");
					console.log(err);
					return;
				}
				//SUCCESS
				connection.end(
					function() {
						var rows = result;
						console.log("インサートに成功しました。" );
						//console.log(result);
					}
				);
			}
		);
		connection.query(
			'SELECT * FROM' + ' ' + table
			, function (err, results, fields) {
				//ERROR
				if (err) {
					console.log('SELECT成功');
					console.log('err: ' + err);
				}
	
				//SUCCESS
				res.render('view_user', {
					title: 'USER'
				,	recordList: results
				});
			}
		)
	});
};
module.exports = EditUserController
