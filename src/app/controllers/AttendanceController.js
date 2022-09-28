class AttendanceController {

    // GET /
    index(req, res) {
        res.render('attendance');
    }

}

module.exports = new AttendanceController;