const course = require('../models/course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class meController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([course.find({}), course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, coursesDeleteCount]) => {
                res.render('me/stored-courses', {
                    coursesDeleteCount: coursesDeleteCount,
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch((error) => {
                next(error);
            })
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch((error) => {
                next(error);
            })
    }

    stored
}

module.exports = new meController();