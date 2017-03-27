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

		//履歴に結果保存
		saveHistory(req.body.pastQuestion, req.body.isCorrent)
		.then(function() {
			console.log('insert history finished');
		});

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
		queryArray.push('SELECT'						);
		queryArray.push('*'								);
		queryArray.push('FROM'							);
		queryArray.push(CommonConst.TABLE_NAME_QUESTION	);
		queryArray.push('WHERE'							);
		queryArray.push('CATEGORY_ID'					);
		queryArray.push('IN'							);
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

				//debug
				console.log(result);
				
				var commingQuestionArray = [];
				var nextQuestion; 
				//次の問題があるとき
				if(req.body.commingQuestion) {
					//残っている問題を配列に詰める
					//（１つだけだと配列で渡されない）
					var tmpCommingQuestionArray = [];
					if(!CommonUtils.exTypeOf('Array', req.body.commingQuestion)){
						tmpCommingQuestionArray.push(parseInt(req.body.commingQuestion));
					} else {
						tmpCommingQuestionArray = parseInt(req.body.commingQuestion);
					}

					var commingQuestionSet = new Set(tmpCommingQuestionArray);
					//indexは1から始まる。ここで少しハマった
					result.forEach(function(val, index, array) {
						//これからの問題にレコードが含まれる場合
						if(commingQuestionSet.has(val.ID)) {
							//最初のレコードを次の問題にする
							if(index == 1) {
								nextQuestion = val;
							//それ以降はIDを配列に詰める
							} else {
								commingQuestionArray.push(val.ID);
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

	/**
	* 解答結果を保存するメソッド
	* TODO:selectとinsertを非同期にする
	* @param obj		問題
	* @param boolean	解答結果
	**/
	var saveHistory = function(pastQuestion, isCorrent){

		//直前の問題の履歴を取得
		var queryArray = [];
		queryArray.push('SELECT'								);
		queryArray.push('*'										);
		queryArray.push('FROM'									);
		queryArray.push(CommonConst.TABLE_NAME_STUDY_HISTORY	);
		queryArray.push('WHERE'									);
		queryArray.push('USER_ID ='								);
		queryArray.push(req.session.user.ID						);
		queryArray.push('AND'									);
		queryArray.push('QUESTION_ID ='							);
		queryArray.push(pastQuestion.ID							);
		queryArray.push('ORDER BY CREATED_DATETIME DESC'		);
		//クエリを結合
		var query = queryArray.join(' ');
		//debug
		console.log(query);
		//クエリ実行
		SqlCommon.manipulateRecord(DbConnection, query)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {

				//debug
				console.log(results);

				//結果を判定
    			var histories = results.length ? results : false;

				//TODO:10件以上ある場合は最も古いレコードを削除

				//フィールド
				var fields  = {
						USER_ID			: req.session.user
					,	QUESTION_ID		: pastQuestion.ID
					,	RESULT			: isCorrent
				};
				//インサート処理
				return sqlCommon.insertRecord(DbConnection, CommonConst.TABLE_NAME_STUDY_HISTORY, fields);
			}
		);
	}
};
module.exports = AnswerQuestionController;
