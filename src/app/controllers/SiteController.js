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

}

module.exports = new SiteController;