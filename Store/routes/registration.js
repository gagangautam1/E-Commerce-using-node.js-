/**
 * New node file
 */
exports.registration = function(req, res){
  res.render('registration',{title: 'New User? Register Here',title1: 'Existing User? Login Here'});
};