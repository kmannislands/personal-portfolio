var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PortfolioCategory = new keystone.List('PortfolioCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

PortfolioCategory.add({
	name: { type: String, required: true },
});

PortfolioCategory.relationship({ ref: 'Work', path: 'categories' });

PortfolioCategory.register();
