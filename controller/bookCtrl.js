const Book = require('../model/book.model');
const obId = require("mongoose").Types.ObjectId;

const AppError = require('../utils/AppError');

exports.addBook = async (req,res,next) => {
	try {
		const bk = await Book.create(req.body);

		res.status(201).json({
			status : 'success',
			data : {
				book : bk
			}
		})
	} catch(err) {
		next(err);
	}
}

exports.getAllBooks = async (req,res,next) => {
	try {
		const query = Book.find();

	    const page = req.query.page * 1 || 1;
	    const limit = req.query.limit * 1 || 10;
	    const skip = (page - 1) * limit;
		
    	const bks = await query.skip(skip).limit(limit);

    	res.status(200).json({
    		status : 'success',
    		data : {
    			no_of_books : bks.length,
    			books : bks
    		}
    	})
	} catch(err) {
		next(err)
	}
}

exports.getBook = async (req,res,next) => {
	try {
		if(!(obId.isValid(req.params.id)))
			return next(new AppError('id of book is invalid',400));

		const id = req.params.id;

		const bk = await Book.findOne({_id : id});

		if(!bk)
			return next(new AppError('book id not found',404))

		res.status(200).json({
			status : 'success',
			data : {
				book : bk
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.updateBook = async (req,res,next) => {
	try {
		if(!(obId.isValid(req.params.id)))
			return next(new AppError('id of book is invalid',400));

		const id = req.params.id;

		const bk = await Book.findByIdAndUpdate({_id : id},req.body,{
			runValidators : true,
			new : true
		});

		if(!bk)
			return next(new AppError('book id not found',404));

		res.status(200).json({
			status : 'success',
			data : {
				book : bk
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.deleteBook = async (req,res,next) => {
	try {
		if(!(obId.isValid(req.params.id)))
			return next(new AppError('id of book is invalid',400));

		const id = req.params.id;

		const bk = await Book.findOne({_id : id});

		if(!bk)
			return next(new AppError('book id not found',404))

		await bk.remove();

		res.status(204).json({})
	} catch(err) {
		next(err)
	}
}