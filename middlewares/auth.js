const jwt = require('jsonwebtoken')
const { promisify } = require('util')
module.exports = {
    isAdmin: async function (req, res, next) {

        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(404).send({
                message: "Necessário realizar o login para acessar a página! Falta o token!"
            })
        }
        const [, token] = authHeader.split(' ')
        if (!token) {
            return res.status(404).send({
                message: "Necessário realizar o login para acessar a página! Falta o token!"
            })
        }
        try {
            const decode = await promisify(jwt.verify)(token, process.env.JWT_KEY)
            req.userid = decode.id
            return next()
        } catch (error) {
            return res.status(400).send({
                message: "Necessário realizar o login para acessar a página! Token inválido! " + error
            })
        }
    }
}