
var cache=[];

exports.cart= function(req,res)
{
	var mysql = require('mysql');
	var product= require('./product');
	console.log("3333333333");
	 
	
	
	req.session ={id: req.param('id')};
	req.session ={quantity: req.param('quant')};
	req.session ={name: req.param('name')};
	req.session = {user1:req.param('user')}; 
	
	cache.push(req.session.user1);
	cache.push(req.param('id'));
	cache.push(req.param('quantity'));
	cache.push(req.param('name'));
	
	for (var i=0;i<4;i++)
		{
		console.log(cache[i]);
		}
	
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
	
	
	console.log("777");
	var price=parseInt(req.param('price'),'2');
	console.log(price);
	console.log("2344");
	
db.query("select price from product where id=?",[req.param('id')],function(err,rows1){
		if (err)
		{
			console.log('Connection result error '+err);
				}
		else
			
			{
			console.log(rows1[0].price);
			db.query("insert into cart (userid,id,quantity,name,price) values (?,?,?,?,?) ",[req.session.user1,req.param('id'),req.param('quant'),req.param('name'),rows1[0].price],function(err,rows)
					{
				if (err)
				{
				console.log('Connection result error '+err);
					}
				else
					{
					product.product();
					}});
			}
			
			});
};
	

	