/**
* 問題カテゴリの登録画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/18
* Updated by 
* Updated on 
**/
var EditQuestionCategoryController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	// /edit_question_categoryにアクセスした場合のルーティング
	app.get('/edit_question_category', function(req, res) {

		var resultArray = [];
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_EXAM)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);
				resultArray.push(result);
				return Promise.resolve();
			}
		)
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
				res.render(commonConst.PAGE_ID_EDIT_QUESTION_CATEGORY, {
						examList			: resultArray[0]
					,	questionCategoryList: resultArray[1]
				});
			}
		)
	});

	// /create_question_categoryにPOSTした場合の処理
	app.post('/create_question_category', function(req, res) {

		console.log(req.body.exam_name);

		//フィールド
		var fields  = {
			EXAM_ID: req.body.exam_id
		,	PARENT_QUESTION_CATEGORY: req.body.parent_question_category
		,	CATEGORY_NAME: req.body.category_name
		};

		if(fields.PARENT_QUESTION_CATEGORY == 'blank') {
			fields.PARENT_QUESTION_CATEGORY = 0;
		}

		//インサート処理
		sqlCommon.insertRecord(connection, commonConst.TABLE_NAME_QUESTION_CATEGORY, fields)
		//セレクト処理
    	.then(
			function() {
				console.log('insert success!');
				return sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_QUESTION_CATEGORY)
			}
		)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_VIEW_QUESTION_CATEGORY, {
					title:		'EXAM',
					recordList:	results
				});
			}
		);
	});
};
module.exports = EditQuestionCategoryController;
