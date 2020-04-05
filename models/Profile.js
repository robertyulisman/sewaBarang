const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
        user: {
                type: Schema.Types.ObjectId,
                ref: 'drivers',
        },
        handle: {
                type: String,
                required: true,
                max: 40,
        },

        current: {
                type: Boolean,
                default: false,
        },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
