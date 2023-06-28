const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');
const celebrates = require('../middlewares/celebrate');

router.get('/', getUsers);
router.get('/me', getUserById);
router.get('/:id', celebrates.validateUserId, getUserById);
router.patch('/me', celebrates.validateUpdateUser, updateUser);
router.patch('/me/avatar', celebrates.validateUserAvatar, updateUserAvatar);

module.exports = router;
