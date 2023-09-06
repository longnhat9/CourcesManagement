const course = require('../models/course');
const { multipleMongooseToObject } = require('../../util/mongoose');
// Destructuring assignment (gán giá trị từ một đối tượng) được sử dụng ở đây để chỉ lấy ra một phần cụ thể từ đối tượng được 
// xuất từ module mongoose. Cụ thể, nó chỉ lấy ra thuộc tính hoặc hàm có tên là multipleMongooseToObject từ module.

class SiteController {
    // Method: [GET] 
    // Path: /
    async index(req, res, next) {
        await course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                })}
            )
            .catch((error) => res.next(error));
    }

    // Method: [GET] 
    // Path: /search
    search(req, res) {
        res.send("Search");
    }
}

module.exports = new SiteController;