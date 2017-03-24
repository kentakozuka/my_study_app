/**
* ユーザ一覧画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/24
* Updated by 
* Updated on 
**/
var UserViewController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	// /user_viewにGETした場合の処理
	app.get('/view_user', function(req, res) {

		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_USER)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_VIEW_USER, {
					recordList:	results
				});
			}
		);
	});
};
module.exports = UserViewController
