
//モジュールをインクルード
var express						= require('express');
var bodyParser					= require('body-parser')
//var session						= require('express-session');
var connection					= require('./mysqlConnection.js'); 

// App
var app = express();

//viewsディレクトリを設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//middleware
// if access with name of filename, then responses the files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//コントローラ
EditExamController				= require("./controllers/EditExamController.js"				)(app);
EditQuestionCategoryController	= require("./controllers/EditQuestionCategoryController.js"	)(app);
EditQuestionController			= require("./controllers/EditQuestionController.js"			)(app);

ViewExamController				= require("./controllers/ViewExamController.js"				)(app);
ViewQuestionCategoryController	= require("./controllers/ViewQuestionCategoryController.js"	)(app);
ViewResultController			= require("./controllers/ViewResultController.js"			)(app);
ViewUserController				= require("./controllers/ViewUserController.js"				)(app);
ViewQuestionController			= require("./controllers/ViewQuestionController.js"			)(app);

UserSignUpController			= require("./controllers/UserSignUpController.js"			)(app);
IndexController					= require("./controllers/IndexController.js"				)(app);
SelectExamController			= require("./controllers/SelectExamController.js"			)(app);
SelectQuestionController		= require("./controllers/SelectQuestionController.js"		)(app);
AnswerQuestionController		= require("./controllers/AnswerQuestionController.js"		)(app);



//サーバ待受
app.listen(3000);
console.log('server is listening');
