const course = require('../models/course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class meController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        course.find({})
            .then((courses) => {
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch((error) => {
                next(error);
            })
    }
}

module.exports = new meController();