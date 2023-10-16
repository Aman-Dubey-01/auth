const { hashPassword, comparePassword } = require("../helper/auth");
const User = require("../models/user");
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // basic validation 
        if (!name) {
            return res.json({ error: 'Name is required' })
        }
        if (!email) {
            return res.json({ error: 'email is required' })
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'password is required and minimum 6 characters long' })
        }

        // Check if user already exist
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email already exist' })
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // create user to database
        const createdUser = await User.create({ name, password: hashedPassword, email });
        return res.json({ message: 'User created successfully', user: createdUser });


    } catch (error) {
        console.log(error);
        return res.json({ error: 'Something went wrong' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // basic validation
        if (!email) {
            return res.json({ error: 'email is required' })
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'password is required and minimum 6 characters long' })
        }

        if (email) {
            const user = await User.findOne({ email });
            if (user) {
                const matched = await comparePassword(password, user.password);
                if (matched) {
                    jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                        if (err) {
                            console.log(err);
                        }
                        return res.cookie('token', token, { expiresIn: '1d' }).json({ message: 'Login successful' });
                    });

                } else {
                    return res.json({ error: 'wrong password' });
                }
            } else {
                return res.json({ error: "User doesn't exist " });
            }
        }

    } catch (error) {
        console.log(error);

    }
}

const getUser = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    throw new Error(err);
                }
                res.json(user);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser, loginUser, getUser, logoutUser };