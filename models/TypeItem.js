var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var TypeItem = new keystone.List('TypeItem', {
	map: { name: 'content' },
	autokey: { path: 'slug', from: 'content', unique: true },
});

TypeItem.add({
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	content: { type: String, required: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

// TypeItem.schema.virtual('content').get(function () {
// 	return this.content.extended || this.content.brief;
// });

TypeItem.defaultColumns = 'content, state|20%, publishedDate|20%';
TypeItem.register();
