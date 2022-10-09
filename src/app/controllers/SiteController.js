
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

    chatRealTime(req, res) {
        res.render('chatRealTime');
    }

    kenhChat(req, res) {
        res.render('kenhChat');
    }

}

module.exports = new SiteController;