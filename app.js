const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const models = require('./models');
const debug = require('debug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan);
}

const server = http.createServer(app);

models.sequelize.sync().then(() => {
  server.listen(process.env.PORT, () => {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe' + addr : 'port ' + addr.port
    debug(chalk.green('Express server listening on port ' + server.address().port));
  })
})

server.start();