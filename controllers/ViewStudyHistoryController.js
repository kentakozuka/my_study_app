/**
* 履歴一覧画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/24
* Updated by 
* Updated on 
**/
var ViewStudyHistoryController = function(app, CommonConst, DbConnection, SqlCommon){

	// /user_viewにGETした場合の処理
	app.get('/view_study_history', function(req, res) {

		SqlCommon.selectRecord(DbConnection, CommonConst.TABLE_NAME_STUDY_HISTORY)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(CommonConst.PAGE_ID_VIEW_STUDY_HISTORY, {
					recordList:	results
				});
			}
		);
	});
};
module.exports = ViewStudyHistoryController
