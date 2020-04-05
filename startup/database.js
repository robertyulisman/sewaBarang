const mongoose = require('mongoose');
const key = require('../config/keys');

class database {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(key.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            });
            console.log(' MongDB Successfull Connected');
        } catch (e) {
            console.error(e);
        }
    }
}

exports.database = new database();
