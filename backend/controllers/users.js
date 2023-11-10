const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ConflictError = require('../utils/ConflictError');

const userModel = require('../models/user');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
  .then((hash) => userModel.create({
    name, about, avatar, email, password: hash,
  }))
  .then((user) => {
    return res.status(201).send({
      data: {
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    },
  });
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email существует'));
    } else {
      next(err);
    }
  });
};

const getUsers = (req, res, next) => {
  userModel.find({})
  .then((users) => {
    return res.status(200).send(users);
  })
  .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  userModel.findById(userId)
  .orFail(new NotFoundError('Пользователь с данным id не найден'))
  .then((user) => {
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.message === 'Пользователь с данным id не найден') {
      next(new NotFoundError('Пользователь с данным id не найден'));
    } else {
      next(err);
    }
  });
};

const getUserInfo = (req, res, next) => {
  userModel.findById(req.user._id)
  .orFail(new NotFoundError('Пользователь с данным id не найден'))
  .then((user) => {
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.message === 'Пользователь с данным id не найден') {
      next(new NotFoundError('Пользователь с данным id не найден'));
    } else {
      next(err);
    }
  });
};

const updateUserInfoById = (req, res, next) => {
  const { name, about } = req.body;

  userModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
  .orFail(new NotFoundError('Пользователь с данным id не найден'))
  .then((user) => {
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.message === 'Пользователь с данным id не найден') {
      next(new NotFoundError('Пользователь с данным id не найден'));
    } else {
      next(err);
    }
  });
};

const updateUserAvatarById = (req, res, next) => {
  const { avatar } = req.body;

  userModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
  .orFail(new NotFoundError('Пользователь с данным id не найден'))
  .then((user) => {
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.message === 'Пользователь с данным id не найден') {
      next(new NotFoundError('Пользователь с данным id не найден'));
    } else {
      next(err);
    }
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

    res.send({ token });
  })
  .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserInfo,
  updateUserInfoById,
  updateUserAvatarById,
  login,
};
