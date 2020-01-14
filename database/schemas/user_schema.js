const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true // only google auth requires required field
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true,
        bcrypt: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

UserSchema.plugin(require('mongoose-bcrypt'));
module.exports = UserSchema;
// mongoose.model("users", UserSchema);