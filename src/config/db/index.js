const mongoose = require('mongoose');
async function connect(key) {


    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect('mongodb+srv://trananhvin77:'+key+'@pmst.ifntthz.mongodb.net/checkin-students', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to database success!');

        
    }
    catch (error) {
        console.log('Connect to database failure!');
        process.exit(1)
    }

}


module.exports = { connect };
