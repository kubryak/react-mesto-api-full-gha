const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const celebrates = require('../middlewares/celebrate');

router.use('/signin', celebrates.validateCreateAndLoginUser, login);
router.use('/signup', celebrates.validateCreateAndLoginUser, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
