
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , product = require('./routes/product')
  , registration= require('./routes/registration')
  , register= require('./routes/register')
  , login1=require('./routes/login1')
  , login= require('./routes/login')
  , displaycart= require('./routes/displaycart')
  , authenticate=require('./routes/authenticate')
  , cart= require('./routes/cart')
  , http = require('http')
  , path = require('path')
  , mysql= require('mysql');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

var MemoryStore = require('connect').session.MemoryStore; 
app.use(express.cookieParser()); 
app.use(express.session({ secret: "abc", store: new MemoryStore({ reapInterval: 60000 * 10 }) }));
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development'=== app.get('env')) {
  app.use(express.errorHandler());
}
var db = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'admin',
	  database : 'nodejs',
	  debug : true,
	});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/product',product.product);
app.get('/registration',registration.registration);

app.get('/login1',login1.login1);
app.post('/register',register.register);
app.post('/login',login.login);
app.post('/cart',cart.cart);
app.get('/Authenticate',authenticate.authenticate);
//app.post('/displaycart',displaycart.displaycart);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
