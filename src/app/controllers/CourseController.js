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
    store(req, res, next) {
        //const formData = req.body;
        const dataCreateCourse = req.body;
        dataCreateCourse.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // const course = new course({những thuộc tính ở đây mà muốn thêm vào document trong database});
        // những thuộc tính muốn thêm vào trong document database thì trong document và model phải chứa những trường thông tin đó
        const newCourse = new Course(dataCreateCourse);
        newCourse.save()
            .then(() => {
                res.redirect('/me/stored/courses'); // chuyển hướng về trang chủ (/)
            })
            .catch((error) => {
                next(error);
            })
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        // req.paramschứa các tham số tuyến đường (trong phần đường dẫn của URL) và req.query chứa các tham số truy vấn URL (sau ?URL).
        // localhost:3000/courses/:id/edit
        // id lúc này là 1 biến có giá trị thay đổi tùy theo parameters mà client gửi lên
        // req.params.id = giá trị của biến id;
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch((error) => {
                next(error);
            })
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const updateDataCourse = req.body;
        Course.findOneAndUpdate({ _id: req.params.id }, updateDataCourse)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch((error) => {
                next(error);
            })
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch((error) => {
                next(error);
            })
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch((error) => {
                next(error);
            })
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch((error) => {
                next(error);
            })
    }
}

module.exports = new CoursesController();