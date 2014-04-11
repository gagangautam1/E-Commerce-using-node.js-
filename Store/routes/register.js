function register (req,res){
	var mysql = require('mysql');

	var db = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'admin',
		  database : 'nodejs',
		  debug : true,
		});
	
	console.log(req.param('userid'));
	db.query("select userid from reg where userid=?",[req.param('userid')],function(err,rows)
	{
		if (err)
		{
			console.log("88888888888888888")
			res.render('error',{title: 'Error registering the user. Try Again'});
		}
	else
		{
		console.log("999999999999999");
		 if(rows[0]===1){
			 res.writeHead(404, {"Content-Type": "text/plain"});
				res.write("User already present");
				res.end(); 
		 }
			
		}
	});
	
	console.log(req.param('password'));
	console.log(req.param('password_confirm'));
	if (req.param('password')!==req.param('password_confirm'))
		{
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("Password Do not Match");
		res.end();
		} 
	else
		{
		db.query("insert into reg (firstname,lastname,userid,password) values (?,?,?,?)" ,[req.param('firstname'),req.param('lastname'),req.param('userid'),req.param('password')], function(err){
			if(err)
				{
			
				console.log("error is "+ err);
				res.render('error',{title: 'Error registering the user. Try Again'});
				}
			else
				{
				res.render('login1');
				}
		});
				
		}
	
	}

exports.register=register;