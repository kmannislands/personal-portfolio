var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var technologies = new keystone.List('technologies', {
	autokey: { from: 'name', path: 'key', unique: true },
});

technologies.add({
	name: { type: String, required: true },
});

technologies.relationship({ ref: 'Post', path: 'technologies' });

technologies.register();
