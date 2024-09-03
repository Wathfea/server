const express = require('express');

class UserRouter {
    constructor(userController, authMiddleware) {
        this.userController = userController;
        this.authMiddleware = authMiddleware;
    }

    get router() {
        const router = express.Router();
        router.route('/register').post(this.userController.createUser.bind(this.userController));

        router
            .use(this.authMiddleware.authorize)
            .route('/current')
            .get(this.userController.getCurrent.bind(this.userController));

        router
            .use(this.authMiddleware.authorize)
            .route('/:id')
            .get(this.userController.getUser.bind(this.userController));

        router
            .use(this.authMiddleware.authorize)
            .route('/')
            .get(this.userController.getUsers.bind(this.userController));

        router
            .use(this.authMiddleware.authorize)
            .route('/:id/can-start-game')
            .get(this.userController.canStartGame.bind(this.userController));

        return router;
    }
}

module.exports = UserRouter;
