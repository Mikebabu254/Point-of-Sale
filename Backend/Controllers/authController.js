const User = require('../Models/User');
const Shop = require('../Models/Shop');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const registerUser = async (req, res) => {
    try{
        const { username, password, role, shopId } = req.body;

        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        const existing = await User.findOne({ username});
        if (existing) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            passwordHash,
            role,
            shop: shopId
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    };

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).populate('shop');
        if (!user || !(await user.$isValidPassword(password))) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role, shopId: user.shop._id }, JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ token, user: { id:user._id, username: user.username, role: user.role, shop: user.shop.name } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {registerUser, loginUser};