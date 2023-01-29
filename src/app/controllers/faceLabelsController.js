const StudentModel = require('../../config/models/student/Student');

const faceLabels = {
    // GET face-labels
    index(req, res, next) {
        res.render('faceLabels');
    },

    // POST face-labels
    async upload(req, res, next) {
        // Import data
        const fullName = req.body.fullName
        const block = Number(req.body.block)
        const Class = req.body.Class
        const gender = req.body.gender
        const descriptor = req.body.resultDescriptor
        const sbd = Number(req.body.sbd)
        
        try {
            //  Check class
            const objectClass = await StudentModel.find({class: Class, khoi: block})
            const numberClass = Number(Class.slice(0,2))
            const upperCaseClass = Class.toUpperCase()
            console.log(upperCaseClass)
            // Check
            if(sbd >= 60) {
                return res.status(404).json('Vui lòng nhập lại số báo danh không được lớn hơn 60');
            }
            else if(numberClass != block) {
                return res.status(404).json(`Bạn nhập khối ${block} không đúng với lớp ${upperCaseClass} !!`);
            }
            else if(sbd < 1) {
                return res.status(404).json('Vui lòng nhập lại số báo danh không bé hơn 1');
            }
            else if(!descriptor) {
            }
            const foundError = await objectClass[0].students.filter(student => {
                return student.sbd === sbd
            })
            // Ok
            if (foundError.length === 0) {
                // Create data
                const dataStudent = {
                    name: fullName,
                    sbd: sbd,
                    gender: gender,
                    checkin: false,
                    late: false,
                    descriptor: descriptor
                }
                
                // Insert data
                await StudentModel.update(
                    { class: Class, khoi: block },
                    { $push: { "students": dataStudent } })
                
                res.redirect('/')
            }
            // Not ok
            else {
                let arrayFailName = []
                for(let i = 0; i < foundError.length; ++i) {
                    arrayFailName.push(foundError[i].name)
                }
                const name = arrayFailName.join(', ') 
                res.status(404).json(`Hãy kiểm tra lại số báo danh bị trùng với: ${name} !!`);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = faceLabels;