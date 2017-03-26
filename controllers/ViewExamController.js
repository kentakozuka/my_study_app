var NewExamController = function(app, CommonConst, DbConnection, SqlCommon){

	// /create_examにPOSTした場合の処理
	app.post('/create_exam', function(req, res) {
		console.log(req.body.exam_name);
		//インサートするテーブル名
		var table = 'EXAM';
		//フィールド
		var fields  = {
			EXAM_NAME: req.body.exam_name
		};
		Connection.query(
			'INSERT INTO' + ' ' + table +' '+ 'SET ?'
		,	fields
		,	function(err, result){
				//ERROR
				if (err) {
					// 接続失敗
					console.log("レコードのインサートに失敗しました。");
					console.log(err);
					return;
				}
				//SUCCESS
				Connection.end(
					function() {
						var rows = result;
						console.log("インサートに成功しました。" );
						console.log(result);
					}
				);
			}
		);
		Connection.query(
			'SELECT * FROM' + ' ' + table
			, function (err, results, fields) {
				//ERROR
				if (err) { console.log('err: ' + err); }
	
				//SUCCESS
				res.render('view_exam', {
					title: 'EXAM',
					examList: results
				});
			}
		)
	});
};
module.exports = NewExamController
