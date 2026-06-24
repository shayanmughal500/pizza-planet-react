const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'pizza_planet_secret_key_2026';

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  try { return jwt.verify(token, SECRET); } catch (e) { return null; }
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  const user = verifyToken(header.split(' ')[1]);
  if (!user) return res.status(401).json({ success: false, message: 'Invalid token' });
  req.user = user;
  next();
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
}

module.exports = { generateToken, verifyToken, authMiddleware, adminMiddleware };