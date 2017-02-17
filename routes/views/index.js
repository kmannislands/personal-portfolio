var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		TypeItems: [],
	};


	// Load the current post
	// view.on('init', function (next) {
	//
	// 	var q = keystone.list('TypeItem').model.findOne({
	// 		state: 'published',
	// 	}).populate('content');
	//
	// 	q.exec(function (err, result) {
	// 		locals.data.TypeItems = result;
	// 		next(err);
	// 	});
	//
	// });


	// Load the galleries by sortOrder
	view.query('typeitems',
		keystone.list('TypeItem').model.find().sort('sortOrder'));


	// // Load other posts
	// view.on('init', function (next) {
	//
	// 	var q = keystone.list('TypeItems').model.find().where('state', 'published').sort('-publishedDate').populate('content').limit('10');
	//
	// 	q.exec(function (err, results) {
	// 		locals.data.TypeItems = results;
	// 		next(err);
	// 	});
	//
	// });

	// Render the view
	view.render('index');
};
