class SiteController {

    // GET /
    home(req, res) {
        res.render('home');
    }

    // GET /coming-soon
    comingSoon(req, res) {
        res.render('comingSoon');
    }

    // GET /introduce
    introduce(req, res) {
        res.render('introduce');
    }

    // GET /private
    private(req, res) {
        
    }

}

module.exports = new SiteController;