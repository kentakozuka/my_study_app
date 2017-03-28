/**
* アプリ全体の設定やらいろいろ
*
* Created by Kozuka
* Created on 2017/03/15
* Updated by 
* Updated on 
**/

/**
 *モジュールをインクルード
 **/
var express						= require('express'											);
var bodyParser					= require('body-parser'										)
var session						= require('express-session'									);
var connection					= require('./mysqlConnection.js'							); 


/**
 * App
 **/
var app = express();


/**
 * Viewディレクトリを設定
 **/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/**
 * ミドルウェア
 * まだよくわかっていない
 * 要勉強
 **/
// if access with name of filename, then responses the files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


var CommonConst					= require('./lib/CommonConst.js'							);
var DbConnection				= require('./mysqlConnection.js'							);
var SqlCommon					= require('./lib/SqlOperationLib'							);
var CommonUtils					= require('./lib/CommonUtils'								);



/**
 * コントローラ
 **/
//メニュー画面
MenuController					= require("./controllers/MenuController.js"					)(app, CommonConst, DbConnection, SqlCommon);
//登録編集画面
EditExamController				= require("./controllers/EditExamController.js"				)(app, CommonConst, DbConnection, SqlCommon);
EditQuestionCategoryController	= require("./controllers/EditQuestionCategoryController.js"	)(app, CommonConst, DbConnection, SqlCommon);
EditQuestionController			= require("./controllers/EditQuestionController.js"			)(app, CommonConst, DbConnection, SqlCommon);
//一覧画面
ViewExamController				= require("./controllers/ViewExamController.js"				)(app, CommonConst, DbConnection, SqlCommon);
ViewQuestionCategoryController	= require("./controllers/ViewQuestionCategoryController.js"	)(app, CommonConst, DbConnection, SqlCommon);
ViewResultController			= require("./controllers/ViewResultController.js"			)(app, CommonConst, DbConnection, SqlCommon);
ViewUserController				= require("./controllers/ViewUserController.js"				)(app, CommonConst, DbConnection, SqlCommon);
ViewQuestionController			= require("./controllers/ViewQuestionController.js"			)(app, CommonConst, DbConnection, SqlCommon);
ViewStudyHistoryController		= require("./controllers/ViewStudyHistoryController.js"		)(app, CommonConst, DbConnection, SqlCommon);
//ユーザ管理
UserSignUpController			= require("./controllers/UserSignUpController.js"			)(app, CommonConst, DbConnection, SqlCommon);
UserLogInController				= require("./controllers/UserLogInController.js"			)(app, CommonConst, DbConnection, SqlCommon);
//その他
SelectQuestionController		= require("./controllers/SelectQuestionController.js"		)(app, CommonConst, DbConnection, SqlCommon);
AnswerQuestionController		= require("./controllers/AnswerQuestionController.js"		)(app, CommonConst, DbConnection, SqlCommon, CommonUtils);


//サーバ待受
app.listen(3000);
console.log('server is listening');
