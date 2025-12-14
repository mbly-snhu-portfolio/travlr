const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../middleware/auth');

const User = mongoose.model('users');

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function signToken(user) {
  const expiresIn = '1h';
  const payload = { sub: String(user._id), email: user.email };
  const token = jwt.sign(payload, getJwtSecret(), { expiresIn });
  return { token, expiresIn };
}

const register = async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email, and password are required' });
  }

  try {
    const existing = await User.findOne({ email }).exec();
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const user = new User({ name, email, passwordHash: 'temp' });
    await user.setPassword(password);
    await user.save();

    const { token, expiresIn } = signToken(user);
    return res.status(201).json({ user: user.toSafeJSON(), token, expiresIn });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'User already exists' });
    }
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  try {
    const user = await User.findOne({ email }).select('+passwordHash').exec();
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const ok = await user.validatePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const { token, expiresIn } = signToken(user);
    return res.status(200).json({ user: user.toSafeJSON(), token, expiresIn });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const profile = async (req, res) => {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = await User.findById(userId).exec();
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ user: user.toSafeJSON() });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  profile
};
