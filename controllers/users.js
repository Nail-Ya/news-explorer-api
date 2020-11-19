const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    })

      .then((user) => {
        res
          .status(200)
          .send({
            email: user.email,
            name: user.name,
          });
      })

      .catch((error) => {
        if (error.name === 'ValidationError') {
          throw new BadRequestError('Введены невалидные данные');
        }

        if (error.name === 'MongoError' || error.code === 11000) {
          throw new ConflictError('Пользователь с такой электронной почтой уже зарегистрирован');
        }
      }))

    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .send({ token });
    })

    .catch(() => {
      throw new UnauthorizedError('Произошла ошибка: вы не вошли в приложение');
    })

    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((userById) => {
      if (userById === null) {
        throw new NotFoundError('Пользователя нет в базе данных');
      }
      res
        .status(200)
        .send({
          email: userById.email,
          name: userById.name,
        });
    })

    .catch(() => {
      throw new NotFoundError('Пользователя нет в базе данных');
    })

    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserInfo,
};
