
class SiteController {

    // GET /
    home(req, res) {
        res.render('home');
    }

    // GET /coming-soon
    comingSoon(req, res) {
        res.render('comingSoon');
    }
    
    chatRealTime(req, res) {
        res.render('chatRealTime');
    }

    kenhChat(req, res) {
        res.render('kenhChat');
    }

}

module.exports = new SiteController;