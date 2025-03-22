const jwt = require('jsonwebtoken')

const createToken = (payload, isRefresToken) => {
    if(isRefresToken){
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '60min'})
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15min'})
}


module.exports = {createToken}