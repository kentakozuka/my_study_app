var NewExamController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	// /view_question_categoryにGETした場合の処理
	app.get('/view_question_category', function(req, res) {
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_QUESTION_CATEGORY)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_VIEW_QUESTION_CATEGORY, {
					recordList:	results
				});
			}
		);
	});
};
module.exports = NewExamController
