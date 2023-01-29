const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountClassSchema = new Schema({
    type: String,
    class: String,
    username: String,
    password: String,
}, {
    collection: 'accounts'
});


const AccountClassModel = mongoose.model('accounts', AccountClassSchema);

module.exports = AccountClassModel;


