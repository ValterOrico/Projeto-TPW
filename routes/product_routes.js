const express = require('express')
const router = express.Router()
const multer = require('multer')

const ProductsController = require('../controllers/product_controller')
const { isAdmin } = require('../middlewares/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-'
        cb(null, data + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

//Buscar todos os produtos
router.get('/', ProductsController.getProducts)

//Cadastra um produto
router.post('/cadastrar', upload.single('imagem_produto'), ProductsController.postProduct)

//Busca um produto por ID
router.get('/:id', ProductsController.getProductDetail)

//Altera um produto por ID
router.patch('/:id', ProductsController.updateProduct)

//Deleta um produto por ID
router.delete('/:id', ProductsController.deleteProduct)

module.exports = router
