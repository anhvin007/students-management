const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost/checkin-students', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to database success!');

        
    }
    catch (error) {
        console.log('Connect to database failure!');
    }

}

module.exports = { connect };
