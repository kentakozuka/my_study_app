/**
* ユーザログイン画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/24
* Updated by 
* Updated on 
**/
var UserLogInController = function(app, CommonConst, DbConnection, SqlCommon){

	//ログイン画面にGETしたときの処理
	app.get('/user_log_in', function(req, res, next) {
		//セッション情報がある場合
  		if(req.session && req.session.user) {
			//メニュー画面にリダイレクト
    		res.redirect('/menu');
		//セッション情報がない場合
  		} else {
			//ログイン画面のレンダリング実行
    		res.render(CommonConst.PAGE_ID_USER_LOG_IN);
  		}
	});
	
	//ログインボタン押下時
	app.post('/user_log_in', function(req, res, next) {

		//debug
		console.log(req.body);

  		var email = req.body.email;
  		var password = req.body.password;
		
		//クエリ作成
		var queryArray = [];
		queryArray.push('SELECT'							);
		queryArray.push('*'									);
		queryArray.push('FROM'								);
		queryArray.push(CommonConst.TABLE_NAME_USER			);
		queryArray.push('WHERE'								);
		queryArray.push('USER_NAME='						);
		queryArray.push('\'' + req.body.user_name + '\''	);
		queryArray.push('AND'								);
		queryArray.push('USER_PASSWORD='					);
		queryArray.push('\'' + req.body.password + '\''		);
		queryArray.push('LIMIT 1'							);
		//クエリを結合
		var query = queryArray.join(' ');

		//debug
		console.log(query);

		//クエリ実行
		SqlCommon.manipulateRecord(DbConnection, query)
		.spread(
			//セレクト結果を受け取る
			function(results) {

				//debug
				console.log(results);

				//結果を判定
    			var user = results.length? results[0]: false;
				//1件以上の場合
    			if (user) {
					//セッションにユーザIDをいれる
      				req.session.user = user;
					//メニューにリダイレクト
      				res.redirect('/menu');
				//0件の場合
    			} else {
					//ログイン画面に戻す
      				res.render(CommonConst.PAGE_ID_USER_LOG_IN, {
        				noUser: 'ユーザ名とパスワードが一致するユーザーはいません'
      				});
      			}
			}
		);
	});
};
module.exports = UserLogInController
