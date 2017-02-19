var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'works';

	locals.filters = {
		work: req.params.work,
	};

	locals.data = {
		works: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Work').model.findOne({
			state: 'published',
			slug: locals.filters.work,
		});
		// .populate('author categories');

		q.exec(function (err, result) {
			locals.data.work = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Work').model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.limit('4');
			// .populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.works = results;
			next(err);
		});

	});

	// Render the view
	view.render('work');
};
