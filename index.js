const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router');

const app = express();
const port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({ type: '*/*' }));


app.use('/user/create/', routes.unprotectedRoutes);
app.use('/user/', routes.protectedRoutes);

app.get('*', function(req, res) {
  res.render('index');
});




app.listen(port);
