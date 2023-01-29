const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classDataEverydaySchema = new Schema({
    rank: Number,
    classes: [
        {   
            nameClass: String,
            indexSort: Number,
            totalStudent: Number,
            totalStudentCheckin: Number,
            listStudentNoCheckin: Array,
            listStudentLate: Array,
            today: { type: Date, default: Date.now },
        }
    ]
}, {
    collection: 'data',
});

const DataModel = mongoose.model('data', classDataEverydaySchema);

module.exports = DataModel;
