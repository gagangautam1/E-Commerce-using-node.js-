
/*
 * GET home page.
 */

exports.product = function(req,res){
	
var mysql = require('mysql');

console.log(req.session.user);
if(!req.session.user)
	{
	res.render('error',{title: 'Session Broken. Login Agan'});
	}

console.log(req.session.user);
var db = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'admin',
	  database : 'nodejs',
	  debug : true,
	});

var result=db.query("select * from product",function(err,rows,columns){
	if (err)
		{
		console.log('Connection result error '+err);
		}
	else
		{
		 console.log('no of records is '+rows.length);
		console.log(rows[0].id);
	res.render('product.ejs',{title: 'Select Products to add to the Cart:',items: rows,user: req.session.user});
		}
	});
};

/**
 * New node file
 */
