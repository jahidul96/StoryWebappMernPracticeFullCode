const router = require('express').Router();
const User = require('../models/auth');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');



router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const userExits = await User.findOne({ email: email });
    if (userExits) {
        return res.json('user already exits signup please')
    }
    try {

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            email,
            password: hashpassword
        });
        await user.save();
        res.status(201).json('user created succesfully ')
    } catch (err) {
        res.json(err)
    }
})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json("invalid creadential's")

        } else {
            const matchpass = await bcrypt.compare(password, user.password);
            if (!matchpass) {
                return res.json("invalid creadential's")

            } else {
                user.password = undefined;
                user.__v = undefined
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.json({ token, user })
            }
        }


    } catch (error) {
        res.status(404).json('something went wrong')
    }
})

module.exports = router