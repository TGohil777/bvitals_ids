const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('node-uuid')
const chalk = require('chalk');
const models = require('./models');

const fs = require('fs');
require('dotenv').config({
  path: '.variables.env'
});


morgan.token('id', function getId(req) {
  return req.id;
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(assignId);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use(morgan(':id :method :url :response-time', {
  stream: fs.createWriteStream('./access.log',{flags: 'a'})
}));

function assignId (req, res, next) {
  req.id = uuid.v4()
  console.log(req.id)
  next()
}

models.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(chalk.green(`Express server listening on port ${process.env.PORT}`));
  });
})

  // models.auth.create({
  //   firstname: "twinkle",
  //   lastname: "Yadav",
  //   email: "twinkle@gmail.com",
  //   password: "twink@123"
  // }).then(user => {
  //   console.log("User", JSON.stringify(user, null, 3))
  // }).catch(err => {
  //   console.log(err);
  // });

  
  models.role.bulkCreate([
    {
      name: 'clinical admin'
    },
    {
      name: 'provider'
     }
  ])
  .then((roles) => {
    models.auth.findAll({where: {authid: [10006]}, include: ['roles']})
    .then((users) => {
      // For user 1, 2 and 3 set the sames workingDays
      users.forEach(user => {
        user.setRoles(roles) // workingDays is an array (one user hasMany workingDays)
        .then((joinedAuthRole) => {
          console.log(JSON.stringify(joinedAuthRole, null, 3))
        })
        .catch((err) => console.log("Error while joining auth and role : ", err))
      });
    })
    .catch((err) => console.log("Error while auth search : ", err))
  })
  .catch((err) => console.log("Error while role creation : ", err))
