const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jwt-express');
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/config/config.json`)[env];
var cookieParser = require('cookie-parser');
var session = require('express-session');
const path = require('path');



const PORT = process.env.PORT || 3001;
const db = require("./models");
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

require('./routes/api-routes.js')(app); 
require('./routes/api-dictionary-routes.js')(app); 
require('./routes/html-routes.js')(app);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static('public'));
// JWT Token Configuration
app.use(jwt.init("WCFQC9PY8QAFVHUR6XZHG225ZGG5GFTJGILN", {
    cookies: false
}));
// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
//Error Handler
app.use((err, req, res, next) => {
    console.log(`${req.method} ${req.url} - ${err.message}`);

    if (err.name == 'JWTExpressError') err.status = 401;

    res.status(err.status || 400).send({message: `${err.message}`});
});








app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.account) {
        res.clearCookie('user_sid');        
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.account && req.cookies.user_sid) {
        res.redirect('/hyperword');
    } else {
        next();
    }    
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


// route for user signup
app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/signup.html');
    })
    .post((req, res) => {
        let account = db.Account.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(account => {
            req.session.account = account.dataValues;
            res.redirect('/hyperword');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

    app.get("/seedless", async(req, res) => {
      let account = await db.Account.create({
        username: 'test1234',
        password: 'password'
      });
  
      res.status(200).send(account);
    });




app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
         var username = req.body.username,
            password = req.body.password;

        db.Account.findOne({ where: { username: username } }).then(function (account) {
          console.log(account);
            if (!account) {
                res.redirect('/login.html');
            } else if (!account.validPassword(password)) {
                res.redirect('/login.html');
            } else {
                req.session.account = account.dataValues;
                res.redirect('/hyperword');
            }
        });
    });






// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("App listening on PORT " + PORT));
});