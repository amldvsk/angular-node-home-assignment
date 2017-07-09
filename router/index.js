const unprotectedRoutes = require('./unprotected');
const protectedRoutes = require('./protected');


module.exports = {
  protectedRoutes : protectedRoutes,
  unprotectedRoutes : unprotectedRoutes,
}
