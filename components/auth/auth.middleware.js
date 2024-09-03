class AuthMiddleware {
  constructor(authService) {
    this.authService = authService;
  }

  authorize = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer') {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const { isValid } = await this.authService.verifyToken(token);
      if (!isValid) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      next();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
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

module.exports = AuthMiddleware;
