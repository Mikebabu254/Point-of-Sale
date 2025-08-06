const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const Shop = require('./Shop');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
    },
    passwordHash: {
    type: String,
    required: true
    },
    role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'cashier'
    },
    Shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.isValidPassword = async function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);