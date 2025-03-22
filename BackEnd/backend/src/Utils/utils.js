const jwt = require('jsonwebtoken')

const createToken = (payload, isRefresToken) => {
    if(isRefresToken){
        return jwt.sign(payload, process.env.secret_token_refresh, {expiresIn: '60min'})
    }

    return jwt.sign(payload, process.env.secret_token, {expiresIn: '15min'})
}


module.exports = {createToken}