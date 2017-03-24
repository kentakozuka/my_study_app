/**
* ユーザログイン画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/24
* Updated by 
* Updated on 
**/
var UserSignUpController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');
	var moment			= require('moment');


	app.get('/user_sign_up', function(req, res, next) {
  		res.render(commonConst.PAGE_ID_USER_SIGN_UP, {
    		title: '新規会員登録'
  		});
	});

	app.post('/user_sign_up', function(req, res, next) {

		//フィールド
		var fields  = {
			USER_NAME		: req.body.user_name
		,	USER_PASSWORD	: req.body.password
		,	EMAIL			: req.body.email
		};

		//var userName = req.body.user_name;
		//var email = req.body.email;
		//var password = req.body.password;
		//var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
		//var emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1'; // 追加
		//var registerQuery = 'INSERT INTO users (user_name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")'; // 変更

		var queryArray = [];
		queryArray.push('SELECT'						);
		queryArray.push('*'								);
		queryArray.push('FROM'							);
		queryArray.push(commonConst.TABLE_NAME_USER		);
		queryArray.push('WHERE'							);
		queryArray.push('EMAIL='						);
		queryArray.push('\'' + req.body.email + '\''	);
		queryArray.push('LIMIT 1'						);
		//クエリを結合
		var query = queryArray.join(' ');

		sqlCommon.manipulateRecord(connection, query)
		//セレクト結果を受け取る
		.spread(
			function(result) {
				console.log(result);

				//メールアドレスが既に存在する場合
				var emailExists = result.length === 1;
				if (emailExists) {
					res.render(commonConst.PAGE_ID_USER_SIGN_UP, {
						title: '新規会員登録',
						emailExists: '既に登録されているメールアドレスです'
					});
				//存在しない場合
				} else {
					//インサート
					return sqlCommon.insertRecord(connection, commonConst.TABLE_NAME_USER, fields)
				}
			}
		)
		.then(
			function() {
				res.redirect('/view_user');
			}
		);
	});

};
module.exports = UserSignUpController;
