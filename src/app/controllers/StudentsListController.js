const editStudentsHandle = require('./handle/EditStudentsHandle');

class SiteController {

    // GET /students-list
    index(req, res) {
        
        editStudentsHandle.getAllStudents(req, res);
    }

    // DELETE /students-list
    deleteStudents(req, res) {
        
        editStudentsHandle.deleteStudents(req, res);

    }
}

module.exports = new SiteController;