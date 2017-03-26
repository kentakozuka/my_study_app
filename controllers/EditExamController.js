/**
* 試験レコード登録画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/18
* Updated by 
* Updated on 
**/
var EditExamController = function(app, CommonConst, DbConnection, SqlCommon){

	// /edit_examにアクセスした場合のルーティング
	app.get('/edit_exam', function(req, res) {
    	res.render('edit_exam');
	});

	// /create_examにPOSTした場合の処理
	app.post('/create_exam', function(req, res) {

		console.log(req.body.exam_name);

		//フィールド
		var fields  = {
			EXAM_NAME: req.body.exam_name
		};

		//インサート処理
		SqlCommon.insertRecord(DbConnection, CommonConst.TABLE_NAME_EXAM, fields)
		//セレクト処理
    	.then(
			function() {
				console.log('insert success!');
				return SqlCommon.selectRecord(DbConnection, CommonConst.TABLE_NAME_EXAM)
			}
		)
		//ルーティング
		.spread(
			//セレクト結果を受け取る
			function(results) {
				console.log(results);
				//一覧に飛ばす
				res.render(CommonConst.PAGE_ID_VIEW_EXAM, {
					title:		'EXAM',
					recordList:	results
				});
			}
		);
	});
};
module.exports = EditExamController
