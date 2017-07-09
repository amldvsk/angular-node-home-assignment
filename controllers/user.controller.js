const User = require('../models/User');

function createToken(req, res) {
  var user = new User();
  user.genrateToken(function(err, token) {
    if(!err) {
      res.status(200).json({ token : token });
    } else {
      res.status(500).json({ error : 'something went wrong' });
    }
  });
}


module.exports = {
  createToken : createToken
};
