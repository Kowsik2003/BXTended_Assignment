const router = require('express').Router();

const bookCtrl = require('../controller/bookCtrl');
const userCtrl = require('../controller/userCtrl');

router.route('/')
	.post(userCtrl.protect,userCtrl.admin,bookCtrl.addBook)
	.get(userCtrl.protect,bookCtrl.getAllBooks)

router.route('/:id')
	.get(userCtrl.protect,bookCtrl.getBook)
	.patch(userCtrl.protect,userCtrl.admin,bookCtrl.updateBook)
	.delete(userCtrl.protect,userCtrl.admin,bookCtrl.deleteBook)


module.exports = router;