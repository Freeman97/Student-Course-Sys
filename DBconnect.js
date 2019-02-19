var config = require('./DBconfig');
var mysql = require('mysql');
module.exports = mysql.createPool(config);