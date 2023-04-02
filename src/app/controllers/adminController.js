const dataTodayModel = require('../../config/models/classDataEveryday/classDataEveryday')

// Set up time
var timeOpenPage = new Date()
var timeClosePage = new Date()
timeOpenPage.setHours(7, 10, 0)
timeClosePage.setHours(23, 50, 0)


class adminController {

    // GET admin
    async index(req, res, next) {

        try {
        // Check time
        const currentD = new Date()
        if (currentD < timeOpenPage || currentD >= timeClosePage) {
            res.status(500).json('Chưa tới lúc trang hoạt động')
        }
        
        // Check rank
        const rankToday = currentD.getDay()
        // if (rankToday == 0) res.status(500).json('Trang không hoạt động vào chủ nhật')
        
        // Get data in database
        var rankData = await (await dataTodayModel.find({}).lean()).filter(ele => ele.classes.length != 0)
        // Sort Classes and set day
        for(let i = 0; i < rankData.length; ++i) {
            rankData[i].classes.sort((a, b) => a.indexSort - b.indexSort)
            const currentDataDate = rankData[i].classes[0].today
            rankData[i]["today"] = 'Thứ ' + String(currentDataDate.getDay() + 1) + ' -  Ngày ' + String(currentDataDate.getDate()) + ' -  Tháng ' + String(currentDataDate.getMonth() + 1) + ' -  Năm ' + String(currentDataDate.getFullYear())
        }
        
        res.render('admin', { 
            dataToday: rankData,
        });

        }
        catch (err) {
            res.status(500).json(err)
        }
    }


}

module.exports = new adminController;