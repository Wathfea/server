const express = require('express');

class AuthRouter {
  constructor(authController) {
    this.authController = authController;
  }

  get router() {
    const router = express.Router();
    router.route('/login').post(this.authController.login.bind(this.authController));
    return router;
  }
}

module.exports = AuthRouter;
