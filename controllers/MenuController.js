/**
* メニュー画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/18
* Updated by 
* Updated on 
**/
var MenuController = function(app, CommonConst, DbConnection, SqlCommon){

	/**
	 * /menuにアクセスした場合のルーティング
	 **/
	app.get('/menu', function(req, res) {

		//セッションにユーザ情報がない場合
		if (!req.session.user) {
			res.redirect(CommonConst.PAGE_ID_USER_LOG_IN);
			return;
		}

		//セキュリティーの観点からはパスワードはセッションにいれるべきでない
		//しかし、今は対応しない
		//そもそもDBにパスワードをいれるときはハッシュ化していれるべきだと思う
      	res.render(CommonConst.PAGE_ID_MENU, {
        	user: req.session.user
      	});
	});

	/**
	 * ログアウトボタンをクリック場合のルーティング
	 **/
	app.get('/user_log_out', function(req, res, next) {
		//セッション情報を破棄
		req.session.destroy();
		//ログインにリダイレクト
		res.redirect(CommonConst.PAGE_ID_USER_LOG_IN);
	});
};
module.exports = MenuController
