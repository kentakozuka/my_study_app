//モジュールをインクルード
var express = require('express');
var bodyParser = require('body-parser')
//mySQL
var connection = require('./mysqlConnection.js'); 


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
EditExamController				= require("./controllers/EditExamController.js")(app);
EditQuestionCategoryController	= require("./controllers/EditQuestionCategoryController.js")(app);
EditQuestionController			= require("./controllers/EditQuestionController.js")(app);
EditUserController				= require("./controllers/EditUserController.js")(app);
IndexController					= require("./controllers/IndexController.js")(app);
QuestionController				= require("./controllers/QuestionController.js")(app);
SelectExamController			= require("./controllers/SelectExamController.js")(app);
SelectQuestionController		= require("./controllers/SelectQuestionController.js")(app);
ViewExamController				= require("./controllers/ViewExamController.js")(app);
ViewQuestionCategory			= require("./controllers/ViewQuestionCategory.js")(app);
ViewResultController			= require("./controllers/ViewResultController.js")(app);
ViewUserController				= require("./controllers/ViewUserController.js")(app);


// // if accessed to /about
// app.get('/about', function(req, res) {
//     res.send('all about kenta');
// });
// // param with options
// app.get('/users/:name?', function(req, res) {
//     if(req.params.name) {
//         res.send('hello ' + req.params.name);
//     } else {
//         res.send('hello annonymous');
//     }
// });
// // param with usages of regular expression
// app.get('/items/:id([0-9:]+)', function(req, res) {
//     res.send('item no: ' + req.params.id);
// });
// // response a file
// app.get('/hello.txt', function(req, res) {
//     res.sendfile(__dirname + '/public/hello.txt');
// });

//　/indexにアクセスした場合のルーティング
app.get('/index', function(req, res) {
	res.render('index', {title: 'title'});
})  
//　ルートにアクセスした場合のルーティング
app.get('/', function(req, res) {
	//文字列を返す
	res.send('hello world');
});
// パス/newにアクセスした場合のルーティング
app.get('/new', function(req, res) {
    res.render('new');
});

// /createにPOSTした場合の処理
app.post('/create', function(req, res) {
	console.log(req.body.name);
    res.send(req.body.name);
});

// パス/new_questionにアクセスした場合のルーティング
app.get('/new_question', function(req, res) {
    res.render('new_question');
});

// /create_qustionにPOSTした場合の処理
app.post('/create_question', function(req, res) {
	console.log(req.body);
    res.send(req.body.name);
});


// パス/edit_userにアクセスした場合のルーティング
app.get('/edit_user', function(req, res) {
    res.render('edit_user');
});

// パス/edit_userにアクセスした場合のルーティング
app.get('/edit_question_category', function(req, res) {
    res.render('edit_question_category');
});

// パス/new_questionにアクセスした場合のルーティング
app.get('/new_question', function(req, res) {
    res.render('new_question');
});

app.listen(3000);
console.log('server is listening');
