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

	// 試験名のドロップダウンを変更したときにアクセスした場合のルーティング
	app.post('/on_exam_changed', function(req, res) {

		console.log(req.body.exam_id);

		var resultArray = [];
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_EXAM)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);
				var examArray = [];
				for(var i=0; i < result.length; i++) {
					console.log(result[i].ID);
					if( result[i].ID == req.body.exam_id ){
						examArray.unshift(result[i]);
					} else {
						examArray.push(result[i]);
					}
				}
				//配列に詰める
				resultArray.push(examArray);
				return Promise.resolve();
			}
		)
		.then(
			function() {
				//選択したIDをwhereに設定して取得するのがベスト
				//しかし今はめんどくさいのでやらない
				//全部取得して該当のものだけとる
				return sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_QUESTION_CATEGORY);
			}
		)
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);

				//選択した試験に該当するカテゴリのみ表示ようの配列に追加する
				var categoryArrayByExam = [];
				for(var i=0; i < result.length; i++) {
					if( result[i].EXAM_ID == req.body.exam_id ){
						categoryArrayByExam.push(result[i]);
					}
				}

				//取得したレコードの先頭にデフォ値を挿入
				categoryArrayByExam.unshift({ID:'blank', CATEGORY_NAME:'--カテゴリを選択--'});
				//配列に詰める
				resultArray.push(categoryArrayByExam);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_EDIT_QUESTION_CATEGORY, {
						examList			: resultArray[0]
					,	questionCategoryList: resultArray[1]
				});
			}
		)
	});
	// /edit_question_categoryにアクセスした場合のルーティング
	app.get('/edit_question_category', function(req, res) {

		var resultArray = [];
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_EXAM)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);
				//取得したレコードの先頭にデフォ値を挿入
				result.unshift({ID:'blank', EXAM_NAME:'--試験を選択--'});
				//配列に詰める
				resultArray.push(result);

				var categoryArray = [];
				//取得したレコードの先頭にデフォ値を挿入
				categoryArray.unshift({ID:'blank', CATEGORY_NAME:'--カテゴリを選択--'});
				//配列に詰める
				resultArray.push(categoryArray);
				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_EDIT_QUESTION_CATEGORY, {
						examList			: resultArray[0]
					,	questionCategoryList: resultArray[1]
				});
			}
		);
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

		// 親のカテゴリを選択しない場合は0を入れておく
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
