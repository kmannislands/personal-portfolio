var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Work = new keystone.List('Work', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Work.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	logo: { type: Types.CloudinaryImage },
	cover: { type: Types.CloudinaryImage },
	role: { type: Types.Relationship, ref: 'Role', many: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	btnText: { type: String, require: true },
	categories: { type: Types.Relationship, ref: 'PortfolioCategory', many: true },
	technologies: { type: Types.Relationship, ref: 'technologies', many: true },
});

Work.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Work.defaultColumns = 'title, state|20%, categories|20%, publishedDate|20%';
Work.register();
