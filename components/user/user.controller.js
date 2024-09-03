class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }

    createUser = async (req, res) => {
        try {
            const user = await this.userService.addUser(req.body);
            return res.status(201).send(user);
        } catch (error) {
            if (process.env.VERCEL_ENV === 'development') {
                return res.status(500).json({
                    error: 'Internal Server Error',
                    'msg': error.message,
                    'stack': error.stack
                });
            } else {
                return res.status(500).json({
                    error: 'Internal Server Error',
                    'msg': error.message,
                    'stack': error.stack
                });
            }
        }
    };

    getUsers = async (_, res) => {
        try {
            const users = await this.userService.getUsers();
            return res.status(200).send(users);
        } catch (error) {
            if (process.env.VERCEL_ENV === 'development') {
                return res.status(500).json({
                    error: 'Internal Server Error',
                    'msg': error.message,
                    'stack': error.stack
                });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };

    getUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getUser(Number(id));
            return res.status(200).send(user);
        } catch (error) {
            if (process.env.VERCEL_ENV === 'development') {
                return res.status(500).json({
                    error: 'Internal Server Error',
                    'msg': error.message,
                    'stack': error.stack
                });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };

    getCurrent = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
            const { isValid, payload } = await this.authService.verifyToken(token);

            if (!isValid) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const userId = payload.user.id; // The property might be different based on how you structured your JWT payload

            const user = await this.userService.getUser(userId);
            return res.status(200).send(user);
        } catch (error) {
            if (process.env.VERCEL_ENV === 'development') {
                return res.status(500).json({
                    error: 'Internal Server Error',
                    'msg': error.message,
                    'stack': error.stack
                });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };

    canStartGame = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await this.userService.isUserPayed(Number(id));
            if (!user) {
                return res.status(403).json({ error: 'User is not payed' });
            }
            return res.status(200).json({ success: true });
        } catch (error) {
            if (process.env.VERCEL_ENV === 'development') {
                return res.status(500).json({
                    error: 'Internal Server Error',
                    'msg': error.message,
                    'stack': error.stack
                });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}

module.exports = UserController;
