

class SiteController {

    // GET /
    home(req, res) {
        const token = req.cookies.accessToken;
        let checkToken;
        if(token) 
            checkToken = true;
        else 
            checkToken = false;
        res.render('home', {token: checkToken});
    };

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