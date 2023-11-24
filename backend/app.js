require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const appRouter = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const { loginValidation, createUserValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const { PORT = 4000 } = process.env;

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: [
//   'http://localhost:3000',
// ],
// }));

app.use(cors({
  origin: 'https://kramerale.nomoredomainsmonster.ru',
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use(appRouter);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors); // добавлять в самом конце основного файла!!!

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
