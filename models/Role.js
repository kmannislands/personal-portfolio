var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var Role = new keystone.List('Role', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Role.add({
	name: { type: String, required: true },
	color: { type: String, requried: true },
});

Role.relationship({ ref: 'Work', path: 'roles' });

Role.register();
