/**
* ユーザログイン画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/24
* Updated by 
* Updated on 
**/
var UserSignUpController = function(app, CommonConst, DbConnection, SqlCommon){

	//ユーザ登録画面にGETしたときの処理
	app.get('/user_sign_up', function(req, res, next) {
  		res.render(CommonConst.PAGE_ID_USER_SIGN_UP, {
    		title: '新規会員登録'
  		});
	});

	//登録ボタンをクリックしたときの処理
	app.post('/user_sign_up', function(req, res, next) {

		//フィールド
		var fields  = {
			USER_NAME		: req.body.user_name
		,	USER_PASSWORD	: req.body.password
		,	EMAIL			: req.body.email
		};

		//クエリを作成
		var queryArray = [];
		queryArray.push('SELECT'						);
		queryArray.push('*'								);
		queryArray.push('FROM'							);
		queryArray.push(CommonConst.TABLE_NAME_USER		);
		queryArray.push('WHERE'							);
		queryArray.push('USER_NAME='						);
		queryArray.push('\'' + req.body.user_name + '\''	);
		queryArray.push('LIMIT 1'						);
		//クエリを結合
		var query = queryArray.join(' ');

		SqlCommon.manipulateRecord(DbConnection, query)
		//セレクト結果を受け取る
		.spread(
			function(result) {
				console.log(result);

				//ユーザ名重複チェック
				var userNameExists = result.length === 1;
				if (userNameExists) {
					return new Promise.reject();
				}

				//インサート
				return SqlCommon.insertRecord(DbConnection, CommonConst.TABLE_NAME_USER, fields)
			}
		)
		//インサート処理後
		.then(
			function() {
				res.redirect('/view_user');
			}
		)
		//ユーザ重複の場合
		.catch(
			function() {
				res.render(CommonConst.PAGE_ID_USER_SIGN_UP, {
					title: '新規会員登録',
					userNameExists: '既に登録されているユーザ名です'
				});
			}
		)
	});

};
module.exports = UserSignUpController;
