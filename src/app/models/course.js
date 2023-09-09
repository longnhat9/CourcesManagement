const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String, required: true, },
    description: { type: String },
    image: { type: String, maxLength: 500 },
    videoId: { type: String, required: true, },
    slug: { type: String, slug: 'name', unique: true },
    // thuộc tính ràng buộc uique: true là để tránh slug của các course trùng nhau
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Course', Course);