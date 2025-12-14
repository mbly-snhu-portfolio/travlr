const jwt = require('jsonwebtoken');

function getJwtSecret() {
  // For coursework/dev: fallback is acceptable, but prefer env var.
  return process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
}

function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {
  authRequired,
  getJwtSecret
};
