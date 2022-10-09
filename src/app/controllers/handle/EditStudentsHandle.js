const StudentModel = require('../../../config/models/student/Student');
const { multipleMongooseToObject } = require('../../../util/mongoose');


const EditStudentsController = {

    // Handle get all students
    getAllStudents: async (req, res) => {
        try {
            // Get classArray, sort rank and lean
            let classArray = await StudentModel.find().sort({ 'rank': 1 }).lean();

            // Sort students of classArray[index]
            for(let i=0; i<classArray.length; i++){
                classArray[i].students = classArray[i].students.sort((a, b) => {
                    return a.sbd - b.sbd;
                });
            }
            
            // render page and send classArray
            res.render('students-list', { 
                Class: classArray
            });
        }
        catch (err){
            res.status(500).json(err);
        }
    },

    // Handle delete students
    deleteStudents: async(req, res) => {
        try {
            const _idClass = req.params.id;
            const sbd = parseInt(req.params.sbd);

            const student = await StudentModel.update(
                { _id: _idClass },
                { $pull: { students : { sbd: sbd } } }
            );
            
            res.json(student);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

}

module.exports = EditStudentsController;