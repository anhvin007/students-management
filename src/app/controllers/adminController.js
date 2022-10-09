
class adminController {


    // GET admin
    index(req, res, next) {
        res.render('admin');
    }


}

module.exports = new adminController;