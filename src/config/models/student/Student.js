const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    rank: Number,
    khoi: Number,
    class: String,
    students: [
        {
            name: String,
            sbd: Number,
            gender: String,
            checkin: Boolean,
            late: Boolean,
        }
    ],
    khoa: Number,
}, {
    collection: 'students'
});



const StudentModel = mongoose.model('students', StudentSchema);

module.exports = StudentModel;


