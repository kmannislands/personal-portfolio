var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'works';

	// Load the galleries by sortOrder
	view.query('works', keystone.list('Work').model.find({
		state: 'published',
	}).sort('sortOrder'));

	// Render the view
	view.render('works');

};
