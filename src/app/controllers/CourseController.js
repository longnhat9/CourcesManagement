const Course = require('../models/course');
const { mongooseToObject } = require('../../util/mongoose');
class CoursesController {
    // Method: [GET] 
    // Path: /courses/:slug

    // để lấy tham số đường dẫn :slug
    // req.params.slug
    show(req, res, next) {
        Course.findOne({ slug : req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    async store(req, res, next) {
        //const formData = req.body;
        const dataCreateCourse = req.body;
        dataCreateCourse.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // const course = new course({những thuộc tính ở đây mà muốn thêm vào document trong database});
        // những thuộc tính muốn thêm vào trong document database thì trong document và model phải chứa những trường thông tin đó
        const newCourse = new Course(dataCreateCourse);
        await newCourse.save()
            .then(() => {
                res.redirect('/'); // chuyển hướng về trang chủ (/)
            })
            .catch((error) => {
                next(error);
            })
    }
}

module.exports = new CoursesController();