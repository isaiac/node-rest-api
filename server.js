const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
dotenv.config();

const apiController = require('./controllers/api');

const cors = require('./middlewares/api/cors');
const errorHandler = require('./middlewares/api/error-handler');
const helmet = require('./middlewares/api/helmet');
const { sendNotFound } = require('./middlewares/http-responses');

require('./models');

const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet);
app.use(cors);

app.get('/ping', apiController.ping);
app.use('/auth', routes.auth);
app.use('/me', routes.me);
app.use('/users', routes.user);
app.use('/roles', routes.role);
app.use('/permissions', routes.permission);

app.use(sendNotFound);

app.use(errorHandler);

app.listen(process.env.PORT || 3000);

module.exports = app;
