const db = require('./Db')

const Product = db.sequelize.define('produtos', {
    nome: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    },
    preco: {
        type: db.Sequelize.FLOAT
    },
    imagem_produto: {
        type: db.Sequelize.STRING 
        
    }    
})

//Cria um tabela
//Product.sync({force: true})

module.exports = Product
