/**
* 問題解答画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/22
* Updated by 
* Updated on 
**/
var AnswerQuestionController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	// 問題選択画面から来たとき
	app.post('/answer_question', function(req, res) {

		console.log(req.body);

		var queryArray = [];
		queryArray.push('SELECT'							);
		queryArray.push('*'								);
		queryArray.push('FROM'							);
		queryArray.push(commonConst.TABLE_NAME_QUESTION	);
		queryArray.push('WHERE'							);
		queryArray.push('CATEGORY_ID'					);
		queryArray.push('IN'								);
		queryArray.push('('								);
		//カテゴリを追加
		req.body.child_question_category.forEach(function(val, index, array) {
			queryArray.push(val);
			//最後の要素以外はカンマを入れる
			if(index < array.length -1) {
				queryArray.push(',');
			}
		});
		queryArray.push(')'								);
		//クエリを結合
		var query = queryArray.join(' ');

		sqlCommon.manipulateRecord(connection, query)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);

				//次の問題があるとき
				var commingQuestionArray = [];
				var nextQuestion; 
				if(req.body.commingQuestion) {
					var commingQuestionSet = new Set(req.body.commingQuestion);
					result.forEach(function(record) {
						//これからの問題にレコードが含まれる場合
						if(commingQustionSet.has(record.ID)) {
							//最初のレコードを次の問題にする
							if(commingQuestionArray.length == 0) {
								nextQuestion = record;
							//それ以降はIDを配列に詰める
							} else {
								commingQuestionArray.push(record.ID);
							}
						}
					});
				//次の問題がないとき
				} else {
					result.forEach(function(val, index, array) {
						//最初のレコードを次の問題にする
						if(index == 0) {
							nextQuestion = val;
						//それ以降はIDを配列に詰める
						} else {
							commingQuestionArray.push(val.ID);
						}
					});
				}

				console.log(nextQuestion);

				//一覧に飛ばす
				//TODO:次の問題が0のときはどこかに飛ばす
				res.render(commingQuestionArray.length == 0 ? commonConst.PAGE_ID_ANSWER_QUESTION : commonConst.PAGE_ID_ANSWER_QUESTION, {
						selectedExam			: req.body.exam_id
					,	selectedCategoryArray	: req.body.child_question_category
					,	currentQuestion			: nextQuestion
					,	commingQuestion			: commingQuestionArray
				});
			}
		);
	});
};
module.exports = AnswerQuestionController;
