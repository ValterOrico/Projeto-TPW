const db = require('./Db')

const User = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    isAdmin: {
        type: db.Sequelize.STRING,
        defaultValue: 'No'
    }
})

//Cria um tabela 
//User.sync({force: true})

module.exports = User