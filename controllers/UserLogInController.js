/**
* ユーザログイン画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/24
* Updated by 
* Updated on 
**/
var UserLogInController = function(app){

	//Modules
	var connection		= require('../mysqlConnection'); 
	var sqlCommon		= require('../lib/SqlOperationLib');
	var commonConst		= require('../lib/commonConst');

	
	app.get('/', function(req, res, next) {
  		if (req.session.user_id) {
    		res.redirect('/');
  		} else {
    		res.render('login', {
      		title: 'ログイン'
    		});
  		}
	});
	
	app.post('/', function(req, res, next) {
  		var email = req.body.email;
  		var password = req.body.password;
  		var query = 'SELECT user_id FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
  		connection.query(query, function(err, rows) {
    		var userId = rows.length? rows[0].user_id: false;
    		if (userId) {
      		req.session.user_id = userId;
      		res.redirect('/');
    		} else {
      		res.render('login', {
        		title: 'ログイン',
        		noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      		});
    		}
  		});
	});
};
module.exports = UserLogInController
