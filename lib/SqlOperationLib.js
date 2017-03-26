/**
* MySQLを操作するメソッド郡
* 接続する処理を一緒にしたようがいいのか？
**/
var SqlOperationLib = {
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
	},

	//レコードのdelete
	//Promiseを返す
	/**
	* レコードをselectするメソッド
	* @param mysqlのコネクションオブジェクト
	* @param テーブル名
	* @return Promise
	**/
	deleteRecord: function (conn, table, id){
		return conn.query(
			'DELETE FROM ' + table + ' WHERE id=' +  id
		);
	},

	// クエリを指定する
	//Promiseを返す
	/**
	* レコードをselectするメソッド
	* @param mysqlのコネクションオブジェクト
	* @param テーブル名
	* @return Promise
	**/
	manipulateRecord: function(conn, query){
		return conn.query(
			query
		);
	}
};
module.exports = SqlOperationLib;
