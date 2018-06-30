const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// allows the entire public folder to be accessed by the server
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

require('./routes/api-routes.js')(app); 
require('./routes/html-routes.js')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  