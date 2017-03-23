var SelectQuestionController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	// /select_qustionにGETした場合の処理
	app.get('/select_question', function(req, res) {

		var resultArray = [];
		//試験を取得
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_EXAM)
		//セレクト結果を受け取る
		.spread(
			function(result) {
				/**
				 *試験
				**/
				console.log(result);
				//取得したレコードの先頭にデフォ値を挿入
				result.unshift({ID:'blank', EXAM_NAME:'--試験を選択--'});
				//配列に詰める
				resultArray.push(result);

				var categoryMap = new Map();

				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_SELECT_QUESTION, {
						examList					: resultArray[0]
					,	categoryMap	: categoryMap
					,	doesDisplay					: false
				});
			}
		)
	});

	// /select_qustionにPOSTした場合の処理
	app.post('/select_question', function(req, res) {

		var resultArray = [];
		//試験を取得
		sqlCommon.selectRecord(connection, commonConst.TABLE_NAME_EXAM)
		//セレクト結果を受け取る
		.spread(
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

				var parentCategoryMap = new Map();
				//取得したカテゴリ分ループ
				for(var i=0; i < result.length; i++) {
					//選択した試験に紐づくカテゴリの場合
					if(result[i].EXAM_ID == req.body.exam_id ){
						//親カテゴリの場合
						if(!result[i].PARENT_QUESTION_CATEGORY) {
							parentCategoryMap.set(result[i].ID, result[i]);
						}
					}
				}
				//空箱を作成
				var categoryMap = new Map();
				parentCategoryMap.forEach(function(value, key, map){
					console.log(value);
					categoryMap.set(value, new Array());
				});
				//子カテゴリを作成
				for(var i=0; i < result.length; i++) {
					//選択した試験に紐づくカテゴリの場合
					if(result[i].EXAM_ID == req.body.exam_id ){
						//子カテゴリの場合
						if(result[i].PARENT_QUESTION_CATEGORY) {
							//console.log(parentCategoryMap.get(result[i].PARENT_QUESTION_CATEGORY));
							var tmpArray = categoryMap.get(parentCategoryMap.get(result[i].PARENT_QUESTION_CATEGORY));
							console.log(tmpArray);
							tmpArray.push(result[i]);
						}
					}
				}

				//debug
				console.log(categoryMap);

				//一覧に飛ばす
				res.render(commonConst.PAGE_ID_SELECT_QUESTION, {
						examList	: resultArray[0]
					,	categoryMap	: categoryMap
					,	doesDisplay	: true
				});
			}
		)
	});

};
module.exports = SelectQuestionController
