/**
* 問題登録画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/19
* Updated by 
* Updated on 
**/
var EditQuestionController = function(app, CommonConst, DbConnection, SqlCommon){

	// /edit_qustionにGETした場合の処理
	app.get('/edit_question', function(req, res) {
		console.log('hello');

		//TODO: ドロップダウン作成
		//TODO: promise並列化

		var resultArray = [];
		//試験を取得
		SqlCommon.selectRecord(DbConnection, CommonConst.TABLE_NAME_EXAM)
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

				/**
				 *カテゴリ1
				**/
				var category1Array = [];
				//取得したレコードの先頭にデフォ値を挿入
				category1Array.unshift({ID:'blank', CATEGORY_NAME:'--カテゴリを選択--'});
				//配列に詰める
				resultArray.push(category1Array);

				/**
				 *カテゴリ2
				**/
				var category2Array = [];
				//取得したレコードの先頭にデフォ値を挿入
				category2Array.unshift({ID:'blank', CATEGORY_NAME:'--カテゴリを選択--'});
				//配列に詰める
				resultArray.push(category2Array);

				//一覧に飛ばす
				res.render(CommonConst.PAGE_ID_EDIT_QUESTION, {
						examList					: resultArray[0]
					,	parentQuestionCategoryList	: resultArray[1]
					,	childQuestionCategoryList	: resultArray[2]
					,	doesDisplay					: false
				});
			}
		)
	});

	// /edit_qustionにPOSTした場合の処理
	app.post('/edit_question', function(req, res) {

		//TODO: promise並列化

		var resultArray = [];
		//試験を取得
		SqlCommon.selectRecord(DbConnection, CommonConst.TABLE_NAME_EXAM)
		//セレクト結果を受け取る
		.spread(
			function(result) {
				console.log(result);

				/**
				 *試験
				**/
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
				return SqlCommon.selectRecord(DbConnection, CommonConst.TABLE_NAME_QUESTION_CATEGORY);
			}
		)
		.spread(
			//セレクト結果を受け取る
			function(result) {
				console.log(result);

				/**
				 *カテゴリ
				**/
				var parentCategoryArray = [];
				var childCategoryArray = [];
				//選択した試験に該当するカテゴリのみ表示ようの配列に追加する
				for(var i=0; i < result.length; i++) {
					//選択した試験に紐づくカテゴリの場合
					if(result[i].EXAM_ID == req.body.exam_id ){
						//親カテゴリの場合
						if(!result[i].PARENT_QUESTION_CATEGORY) {
							//親カテゴリが選択されている、かつ選択した親カテゴリの場合
							if(req.body.parent_question_category && result[i].ID == req.body.parent_question_category) {
								parentCategoryArray.unshift(result[i]);
							} else {
								parentCategoryArray.push(result[i]);
							}
						//子カテゴリの場合、かつ親カテゴリが選択されている、かつ親カテゴリが選択した親カテゴリの場合
						} else if(req.body.parent_question_category && result[i].PARENT_QUESTION_CATEGORY == req.body.parent_question_category){
							childCategoryArray.push(result[i]);
						}
					}
				}
				//親カテゴリが選択されていない場合
				//取得したレコードの先頭にデフォ値を挿入
				if(!req.body.parent_question_category) {
					parentCategoryArray.unshift({ID:'blank', CATEGORY_NAME:'--カテゴリを選択--'});
				}
				//取得したレコードの先頭にデフォ値を挿入
				childCategoryArray.unshift({ID:'blank', CATEGORY_NAME:'--カテゴリを選択--'});

				//配列に詰める
				resultArray.push(parentCategoryArray);
				resultArray.push(childCategoryArray);

				//一覧に飛ばす
				res.render(CommonConst.PAGE_ID_EDIT_QUESTION, {
						examList					: resultArray[0]
					,	parentQuestionCategoryList	: resultArray[1]
					,	childQuestionCategoryList	: resultArray[2]
				});
			}
		)
	});

	// /create_questionにPOSTした場合の処理
	app.post('/create_question', function(req, res) {

		console.log(req.body);

		//フィールド
		var fields  = {
				TITLE			: req.body.title
			,	EXAM_ID			: req.body.exam_id
			,	CATEGORY_ID		: req.body.child_question_category
			,	TYPE			: req.body.type
			,	BODY			: req.body.body
			,	IMG_QUESTION_1	: req.body.img_question_1
			,	IMG_QUESTION_2	: req.body.img_question_2
			,	IMG_QUESTION_3	: req.body.img_question_3
			,	IMG_QUESTION_4	: req.body.img_question_4
			,	SELECTION_1		: req.body.selection_1
			,	SELECTION_2		: req.body.selection_2
			,	SELECTION_3		: req.body.selection_3
			,	SELECTION_4		: req.body.selection_4
			,	ANSWER			: req.body.answer
			,	EXPLANATION		: req.body.explanation
			,	IMG_EXPL_1		: req.body.img_expl_1
			,	IMG_EXPL_2		: req.body.img_expl_2
			,	IMG_EXPL_3		: req.body.img_expl_3
			,	IMG_EXPL_4		: req.body.img_expl_4
			,	REF_URL_1		: req.body.ref_url_1
			,	REF_URL_2		: req.body.ref_url_2
			,	REF_URL_3		: req.body.ref_url_3
			,	REF_URL_4		: req.body.ref_url_4
			,	SRC_QUESTION	: req.body.src_question
		};

		//インサート処理
		SqlCommon.insertRecord(DbConnection, CommonConst.TABLE_NAME_QUESTION, fields)
		//セレクト処理
    	.then(
			function() {
				console.log('insert success!');
				return SqlCommon.selectRecord(DbConnection, CommonConst.TABLE_NAME_QUESTION)
			}
		)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(CommonConst.PAGE_ID_VIEW_QUESTION, {
					recordList:	results
				});
			}
		);
	});

};
module.exports = EditQuestionController
