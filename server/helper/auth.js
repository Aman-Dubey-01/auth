const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword; 
}

const comparePassword = async (password, hashedPassword) => {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);
    return comparedPassword;
}

module.exports = { hashPassword, comparePassword };