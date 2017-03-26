/**
* 問題解答画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/22
* Updated by 
* Updated on 
**/
var AnswerQuestionController = function(app, CommonConst, DbConnection, SqlCommon, CommonUtils){

	/**
	 * 問題選択画面から来たとき
	 **/
	app.post('/answer_question', function(req, res) {

		console.log(req.body);

		/**
		 * セッションにユーザ情報がない場合は
		 * ログイン画面にリダイレクト
		 **/
		if (!req.session.user) {
			res.redirect(CommonConst.PAGE_ID_USER_LOG_IN);
			return;
		}

		//TODO: 履歴に結果保存


		//次の問題がない場合
		if(!CommonUtils.exTypeOf('undefined', req.body.commingQuestion) && req.body.commingQuestion.length == 0) {
			//問題選択画面にリダイレクト
    		res.redirect(CommonConst.PAGE_ID_SELECT_QUESTION);
			return;
		}

		/**
		 * クエリを作成
		 * カテゴリで絞る
		 **/
		var queryArray = [];
		queryArray.push('SELECT'							);
		queryArray.push('*'								);
		queryArray.push('FROM'							);
		queryArray.push(CommonConst.TABLE_NAME_QUESTION	);
		queryArray.push('WHERE'							);
		queryArray.push('CATEGORY_ID'					);
		queryArray.push('IN'								);
		queryArray.push('('								);
		//カテゴリを追加
		var childCatQuesArray = [];
		if(!CommonUtils.exTypeOf('Array', req.body.child_question_category)){
			childCatQuesArray.push(req.body.child_question_category);
		} else {
			childCatQuesArray = req.body.child_question_category;
		}
		childCatQuesArray.forEach(function(val, index, array) {
			queryArray.push(val);
			//最後の要素以外はカンマを入れる
			if(index != array.length -1) {
				queryArray.push(',');
			}
		});
		queryArray.push(')'								);
		//クエリを結合
		var query = queryArray.join(' ');

		//debug
		console.log(query);

		/**
		 * 問題を取得する
		 **/
		SqlCommon.manipulateRecord(DbConnection, query)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);

				var commingQuestionArray = [];
				var nextQuestion; 
				//次の問題があるとき
				if(req.body.commingQuestion) {
					var commingQuestionSet = new Set(req.body.commingQuestion);
					result.forEach(function(record) {
						//これからの問題にレコードが含まれる場合
						if(commingQuestionSet.has(record.ID)) {
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
				//i.e.問題選択画面から来たとき
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

				console.log('hello');
				console.log(commingQuestionArray);

				//一覧に飛ばす
				res.render(CommonConst.PAGE_ID_ANSWER_QUESTION, {
						selectedExam			: req.body.exam_id
					,	selectedCategoryArray	: childCatQuesArray
					,	currentQuestion			: nextQuestion
					,	commingQuestion			: commingQuestionArray
				});
			}
		);
	});
};
module.exports = AnswerQuestionController;
