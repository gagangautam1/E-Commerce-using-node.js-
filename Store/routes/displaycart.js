exports.displaycart= function(req,res)
{
	var mysql = require('mysql');

	req.session = {user1:req.param('user')};
	console.log(req.session.user1);
	if(!req.session.user1)
		{
		res.render('error',{title: 'Session Broken. Login Agan'});
		}

	
	var db = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'admin',
		  database : 'nodejs',
		  debug : true,
		});

	db.query("select * from cart where userid=?",[req.session.user1],function(err,rows){
		if (err)
			{
			console.log('Connection result error '+err);
			}
		else
			{
			 console.log('no of records is '+rows.length);
			console.log(rows[0].id);
		res.render('displaycart.ejs',{title: 'Following  Products are in the Cart:',items: rows,user: req.session.user});
			}
	});
	};
	