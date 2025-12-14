const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, index: true, required: true },
    passwordHash: { type: String, required: true, select: false }
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function setPassword(password) {
  const saltRounds = 10;
  this.passwordHash = await bcrypt.hash(String(password), saltRounds);
};

userSchema.methods.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(String(password), this.passwordHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email
  };
};

module.exports = mongoose.model('users', userSchema);
