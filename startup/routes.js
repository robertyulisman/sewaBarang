module.exports = (app) => {
    app.use('/api/user', require('../routes/api/user'));
    app.use('/api/vendor', require('../routes/api/vendor'));
    app.use('/api/product', require('../routes/api/product'));
    app.use('/api/sewaitem', require('../routes/api/sewaItem'));
    app.use('/api/kategori', require('../routes/api/kategori'));
};
