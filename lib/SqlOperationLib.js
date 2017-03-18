/**
* MySQLを操作するメソッド郡
* 接続する処理を一緒にしたようがいいのか？
**/
module.exports = {
	/**
	* レコードをinsertするメソッド
	* @param mysqlのコネクションオブジェクト
	* @param テーブル名
	* @param フィールドのJSON
	* @return Promise
	**/
    insertRecord: function (conn, table, fields) {
		return conn.query(
			'INSERT INTO' + ' ' + table +' '+ 'SET ?',
			fields
		);
	},

	//レコードのselect
	//Promiseを返す
	/**
	* レコードをselectするメソッド
	* @param mysqlのコネクションオブジェクト
	* @param テーブル名
	* @return Promise
	**/
	selectRecord: function (conn, table){
		return conn.query(
			'SELECT * FROM' + ' ' + table
		);
	}
};

