const Product = require('../models/Product')

//Buscar todos os produtos
exports.getProducts = async (req, res) => {
    await Product.findAll({
        atributos: ['id', 'nome', 'descricao', 'preco'],
        order: [['id', 'DESC']]
    }).then((product) => {
        return res.status(200).send({
            product
        })
    }).catch((error) => {
        return res.status(500).send({
            message: 'Nenhum user encontrado ' + error
        })
    })
}

//Cadastra um produto
exports.postProduct = async (req, res) => {

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        return res.status(404).send({ message: 'Voce deve colocar um nome para produto' })
    }
    if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
        return res.status(404).send({ message: 'Voce deve colocar um descrição para produto' })
    }
    if (!req.body.preco || typeof req.body.preco == undefined || req.body.preco == null) {
        return res.status(404).send({ message: 'Voce deve colocar uma preço para produto' })
    } else {
        await Product.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            imagem_produto: req.file.path
        }).then(() => {
            return res.status(200).send({
                message: 'Produto cadastrado com sucesso!'
            })
        }).catch((error) => {
            return res.status(500).send({
                message: 'Erro ao cadastrar produto! ' + error
            })
        })
    }
}

//Busca um produto por ID
exports.getProductDetail = async (req, res,) => {
    await Product.findOne({
        attributes: ['id', 'nome', 'descricao', 'preco'],
        where: {
            id: req.params.id
        }
        
    }).then((product) => {
        if (product == null || product == undefined) {
            return res.status(404).send({
                message: 'Não foi encontrado um produto com este ID'
            })
        }
        return res.status(200).send({product})
    }).catch((error) => {
        return res.status(500).send({
            message: 'Nenhum produto encontrado ' + error
        })
    })
}

//Altera um produto
exports.updateProduct = async (req, res) => {
    try {
        await Product.update({
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco
        }, {
            where: {
                id: req.params.id
            }
        })
        return res.status(200).send({
            message: 'Produto alterado com sucesso'
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Erro ao alterar produto ' + error
        })
    }
}

//Deleta um produto
exports.deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).send({
            message: 'Produto deletado com sucesso'
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Erro ao deletar produto ' + error
        })
    } 
}