function login (req,res){
	var mysql = require('mysql');
	var product = require('./product');

	var db = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'admin',
		  database : 'nodejs',
		  debug : true,
		});
	
	db.query("select userid from reg where userid=? and password=?",[req.param('userid'),req.param('password')],function(err,rows)
			{
		        console.log(rows);
				if (err)
				{
					console.log("777");
					res.writeHead(404, {"Content-Type": "text/plain"});
					res.write("Login Unsuccessfull");
					res.render('login1');
				}
			else
				{
				 if(rows[0].userid===req.param('userid')){
					 console.log("333");
					
					 
					 req.session = {user:req.param('userid')}; 
					 var sessionVar=req.session.user; ///session
					 
					 product.product(req,res);
					 
				 }
					
				}
			});
	
}

exports.login=login;