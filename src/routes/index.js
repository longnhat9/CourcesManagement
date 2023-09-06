const siteRouter = require('./site');
const coursesRouter = require('./courses');

function route(app) {
    // app.use() để xử lý all các yêu cầu từ http và đăng ký midlleware
    app.use('/', siteRouter);
    app.use('/courses', coursesRouter);
}

module.exports = route;