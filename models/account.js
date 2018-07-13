
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const crypto = require('crypto');
// var bcrypt = require('bcrypt');



module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    paranoid: true,
    hooks: {
      beforeCreate: (account) => {
        new Promise((resolve, reject) => {
          account.password = crypto.pbkdf2Sync(account.password, config.tokenSecret, 1000, 64, `sha512`).toString(`hex`);

          resolve(account);
        });
      }
    }
  });


  Account.prototype.validPassword = function(password) {
    return new Promise((resolve, reject) => {
      let hash = crypto.pbkdf2Sync(password, config.tokenSecret, 1000, 64, `sha512`).toString(`hex`);
      resolve((hash === this.password)? true : false);
    });
  };

  return Account;
};












// // create a sequelize instance with our local postgres database information.
// //var sequelize = new Sequelize('postgres://postgres@localhost:5432/auth-system');

// // setup User model and its fields.
// //module.exports = (sequelize) => {



// var User = sequelize.define('users', {
//     username: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     hooks: {
//       beforeCreate: (user) => {
//         const salt = bcrypt.genSaltSync();
//         user.password = bcrypt.hashSync(user.password, salt);
//       }
//     },
//     instanceMethods: {
//       validPassword: function(password) {
//         return bcrypt.compareSync(password, this.password);
//       }
//     }    
// });

// // create all the defined tables in the specified database.
// sequelize.sync()
//     .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
//     .catch(error => console.log('This error occured', error));

// // export User model for use in other files.
// module.exports = User;
// //};
