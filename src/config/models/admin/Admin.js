const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountAdminModel = new Schema({
    type: String,
    username: String,
    password: String,
}, {
    collection: 'admins'
});


const AdminModel = mongoose.model('admins', AccountAdminModel);

module.exports = AdminModel;


