/**
* 共通関数
**/
var CommonUtils = {
	/**
	* ログイン状態をチェックする関数
	* セッション情報をチェックし、ログイン情報があればそのまま
	* なければログイン画面に返す
	* @param mysqlのコネクションオブジェクト
	* @param テーブル名
	* @return Promise
	**/
	exTypeOf:	function(type, obj) {
		if(typeof obj === 'undefined' && type === 'undefined') return true;
    	var clas = Object.prototype.toString.call(obj).slice(8, -1);
    	return obj !== undefined && obj !== null && clas === type;
	}
};
module.exports = CommonUtils
