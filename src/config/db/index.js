const mongoose = require('mongoose');
async function connect() {


    try {
        await mongoose.connect('mongodb+srv://trananhvin77:o10uGBfUdD0xdC8i@pmst.ifntthz.mongodb.net/checkin-students', {
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
