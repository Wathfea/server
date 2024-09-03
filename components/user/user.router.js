import express from 'express';

class UserRouter {
    constructor(userController, authMiddleware) {
        this.userController = userController;
        this.authMiddleware = authMiddleware;
    }

    get router() {
        const router = express.Router();
        router.route('/register').post(this.userController.createUser);

        router
            .use(this.authMiddleware.authorize)
            .route('/current')
            .get(this.userController.getCurrent);

        router
            .use(this.authMiddleware.authorize)
            .route('/:id')
            .get(this.userController.getUser);

        router
            .use(this.authMiddleware.authorize)
            .route('/')
            .get(this.userController.getUsers);

        router
            .use(this.authMiddleware.authorize)
            .route('/:id/can-start-game')
            .get(this.userController.canStartGame);

        return router;
    }
}

export default UserRouter;
