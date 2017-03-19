/**
* 問題登録画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/19
* Updated by 
* Updated on 
**/
var EditQuestionController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	// /edit_qustionにPOSTした場合の処理
	app.get('/edit_question', function(req, res) {

		//TODO: ドロップダウン作成
		//TODO: promise並列化
		//TODO: 種別をラジオボタン化

		var resultArray = [];
		//試験を取得
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_EXAM)
		//セレクト結果を受け取る
		.spread(
			function(result) {
				console.log(result);
				//配列に詰める
				resultArray.push(result);
				return Promise.resolve();
			}
		)
		//カテゴリーを取得
		.then(
			function() {
				return sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_QUESTION_CATEGORY);
			}
		)
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);
				resultArray.push(result);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_EDIT_QUESTION, {
						examList			: resultArray[0]
					,	questionCategoryList: resultArray[1]
				});
			}
		)
	});

	// /create_questionにPOSTした場合の処理
	app.post('/create_question', function(req, res) {

		console.log(req.body);

		//フィールド
		var fields  = {
			EXAM_NAME: req.body.exam_name
		};

		//インサート処理
		sqlCommon.insertRecord(connection, commonConst.TABLE_NAME_EXAM, fields)
		//セレクト処理
    	.then(
			function() {
				console.log('insert success!');
				return sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_EXAM)
			}
		)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_VIEW_EXAM, {
					title:		'EXAM',
					recordList:	results
				});
			}
		);
	});

};
module.exports = EditQuestionController
