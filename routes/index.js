const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

// роут на регистрацию пользователя
router.post('/signup', validateUser, createUser);

// вход пользователя в систему
router.post('/signin', validateLogin, login);

// роут для работы с пользователями
router.use('/', auth, usersRouter);

// роут для работы со статьями
router.use('/', auth, articlesRouter);

// роут при запросе несуществующего адреса
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
