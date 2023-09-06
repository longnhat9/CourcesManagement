const course = require('../models/course');
const { mongooseToObject } = require('../../util/mongoose');
class CoursesController {
    // Method: [GET] 
    // Path: /courses/:slug

    // để lấy tham số đường dẫn :slug
    // req.params.slug
    show(req, res, next) {
        course.findOne({ slug : req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                });
            })
            .catch((error) => next(error));
    }

    create(req, res, next) {
        res.send('Create Course');
    }
}

module.exports = new CoursesController();