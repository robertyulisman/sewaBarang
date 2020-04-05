module.exports = (app) => {
    app.use('/api/user', require('../routes/api/user'));
    app.use('/api/jobs', require('../routes/api/jobRoutes'));
};
