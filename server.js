var express = require('express');
var monk = require('monk');
var mysql = require('mysql');

var app = express();

app.engine('html', require('ejs').renderFile);

//app configuration
var ipaddr = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;


//mysql configuration
var mysqlHost = process.env.MYSQL_SERVICE_HOST || 'localhost';
var mysqlPort = process.env.MYSQL_SERVICE_PORT || 3306;
var mysqlUser = process.env.MYSQL_USER; //mysql username
var mysqlPass = process.env.MYSQL_PASSWORD; //mysql password
var mysqlDb   = process.env.MYSQL_DATABASE; //mysql database name

//connection strings
var mysqlString = 'mysql://'   + mysqlUser + ':' + mysqlPass + '@' + mysqlHost + ':' + mysqlPort + '/' + mysqlDb;


//connect to mysql
/* var mysqlClient = mysql.createConnection(mysqlString);
mysqlClient.connect(function(err){
  if (err) console.log(err);
}); */

var content = "<ul>" +
    "<li>"+mysqlUser+"</li>"+
    "<li>"+mysqlHost+"</li>"+
    "<li>"+mysqlPort+"</li>"+
    "<li>"+mysqlDb+"</li>"+
    "</ul>";

// app is running!
app.get('/', function(req, res) {
    res.render('index.html', { contents: content });
});

//MySQL is running!
/* app.get('/mysql', function(req, res) {
  mysqlClient.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) {
      res.send('NOT OK' + JSON.stringify(err));
    } else {
      res.send('OK: ' + rows[0].solution);
    }
  });
}); */

app.listen(port, ipaddr);

console.log('Server running at http://' + ipaddr + ':' + port + '/');
console.log('MySQL running at mysql://[user:password]@' + mysqlHost + ':' + mysqlPort + '/nodejs');