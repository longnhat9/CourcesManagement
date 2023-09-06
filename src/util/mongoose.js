// util là tệp để chứa các công cụ xử lý các logic

// file mongoose xử lý về logic truyền object thông qua model
module.exports = {
    multipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map((mongoose) => mongoose.toObject());
    },

    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};