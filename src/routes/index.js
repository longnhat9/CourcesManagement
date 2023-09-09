const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    // app.use() để định nghĩa ra 1 tuyến đường và sử dụng midlleware
    app.use('/', siteRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
}

module.exports = route;