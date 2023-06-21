const express = require('express');

const ctrl = require('../../controllers/users');
const { authenticate, validateBody, upload } = require('../../middlewares');
const { schema } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schema.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schema.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validateBody(schema.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, validateBody(schema.subscriptionSchema), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single('avatarURL'), ctrl.updateAvatar);

module.exports = router;
