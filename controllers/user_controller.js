const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Busca todos os users
exports.allUser = async  (req, res) => {
    
    await User.findAll({
        atributos: ['id', 'nome', 'email'],
        order: [['id', 'DESC']]
    }).then((user) => {
        return res.status(200).send({           
            user_login_id: req.userid,
            user
        })   
    }).catch(() => {
        return res.status(404).send({
            message: 'Nenhum user encontrado'
        })
    })
}

//Cadastra novo usuario
exports.createUser = async (req, res) => {

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        return res.status(400).send({ message: "Voce deve colocar um nome" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        return res.status(400).send({ message: "Voce deve colocar um email" })
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        return res.status(400).send({ message: "Voce deve colocar uma senha" })
    }
    if (req.body.senha.length < 5) {
        return res.status(400).send({ message: "Senha muito curta" })
    } else {
        var data = req.body
        data.senha = await bcrypt.hash(data.senha, 10)

        await User.create(data)
            .then(() => {
                return res.status(200).send({
                    message: "Usuário cadastrado com sucesso!"
                })
            }).catch((error) => {
                return res.status(404).send({
                    message: "Usuário não cadastrado com sucesso! " + error
                })
            })
    }
}

//login e gera um token
exports.Login = async (req, res) => {

    const user = await User.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: req.body.email
        }
    })
    if (user === null) {
        return res.status(400).send({
            message: "Usuário ou a senha incorreta!"
        })
    }
    if (!(await bcrypt.compare(req.body.senha, user.senha))) {
        return res.status(400).send({
            message: "Senha incorreta!"
        })
    }
    var token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: '1h'
    })
    return res.status(200).send({
        message: "Login realizado com sucesso!",
        token
    })
}