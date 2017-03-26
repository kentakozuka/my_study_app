
var mysql = require('mysql-promise')();

mysql.configure({
		host     : 'localhost'
	,	user     : 'sample'
	,	password : 'Sample1!'
	,	database: 'SampleDB040'
})

console.log('DB connected');

module.exports = mysql;
