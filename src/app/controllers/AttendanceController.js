const jwt = require('jsonwebtoken')
const StudentModel = require('../../config/models/student/Student');
const dataTodayModel = require('../../config/models/classDataEveryday/classDataEveryday')

// Set up time
var timeOpenPage = new Date()
var timeClosePage = new Date()
timeOpenPage.setHours(6, 0, 0)
timeClosePage.setHours(23, 0, 0)



class AttendanceController {

    // GET /
    async index(req, res) {
        // Check time
        var currentD = new Date();    
        if (currentD < timeOpenPage || currentD >= timeClosePage) {
            res.status(500).json('Chưa tới lúc trang hoạt động')
        }

        // Get name class
        const token = req.cookies.accessToken
        const idTypeNameClass = jwt.verify(token, 'mk');
        const nameClass = idTypeNameClass.nameClass
        // Get students and sort
        function compare(std1, std2) {
            if (std1.sbd < std2.sbd) {
                return -1;
            }
            if (std1.sbd > std1.sbd) {
                return 1;
            }
            return 0;
        }
        const objectClass = await StudentModel.find({class: nameClass})
        const students = await objectClass[0].students.sort(compare)
        const limitStudents = JSON.stringify(students.reduce((acc, cur) => {
            return [...acc, {name: cur.name, sbd: cur.sbd, gender: cur.gender, checkin: false, late: false}]
        }, []))

        let descriptors = ''
        for(let i = 0; i < students.length; ++i) {
            let descriptor = students[i].descriptor
            descriptors += descriptor + ','
        }
        descriptors = '[' + descriptors.substring(0, descriptors.length - 1) + ']'
        
        res.render('attendance', {
            nameClass: JSON.stringify([nameClass, objectClass[0].rank]),                                                  
            students: limitStudents,
            descriptorStudents: descriptors
        });
    }
    // POST
    async post(req, res) {
        // Get data
        const currentD = new Date()
        const data = JSON.parse(req.body.data)
        data.nameClass = data.nameClass.toUpperCase()
        data.today = currentD
        try {
            // Check rank
            const rank = currentD.getDay()
            if(rank == 0) res.redirect('/')
            const rankData = await dataTodayModel.find({ rank: rank })

            // Check empty
            const classData = await rankData[0].classes.filter(Class => {
                return Class.nameClass === data.nameClass
            })
            if (classData.length != 0) {
                // Remove this class
                await dataTodayModel.update(
                    { rank: rank },
                    { $pull: { "classes": { nameClass: data.nameClass } } }
                );
            }

            // Insert data
            await dataTodayModel.update(
                { rank: rank },
                { $push: { "classes": data } })

            res.redirect('/')
            
        }
        catch (err){
            res.status(500).json(err)
        }
    }
}

module.exports = new AttendanceController;