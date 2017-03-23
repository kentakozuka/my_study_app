var ViewQuestionController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	// /view_question_categoryにGETした場合の処理
	app.get('/view_question', function(req, res) {
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_QUESTION)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_VIEW_QUESTION, {
					recordList:	results
				});
			}
		);
	});

	// /view_question_categoryにPOSTした場合の処理
	app.post('/view_question', function(req, res) {

		console.log(req.body);

		//選択したレコードを削除する
		sqlCommon.deleteRecord(connection, commonConst.TABLE_NAME_QUESTION, req.body.question_id)
		//セレクト処理
    	.then(
			function() {
				console.log('delete success!');
				return sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_QUESTION)
			}
		)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_VIEW_QUESTION, {
					recordList:	results
				});
			}
		);
	});
};
module.exports = ViewQuestionController
