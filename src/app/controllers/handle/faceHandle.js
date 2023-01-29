const StudentModel = require('../../../config/models/student/Student');


const faceHandles = {

    // Upload labeled images
    async uploadLabeledImages(images, label) {
        try {

            const descriptions = [];
            // Loop through the images
            for (let i = 0; i < images.length; i++) {
                const img = await canvas.loadImage(images[i]);
                // Read each face and save the face descriptions in the descriptions array
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections.descriptor);
            }

            const createFace = new ({
                label: label,
                descriptions: descriptions,
            });
            await createFace.save();
            return true;
        } catch (error) {
            console.log(error);
            return (error);
        }
    },

    // Handle delete students
    deleteStudents: async (req, res) => {
        try {
            const _idClass = req.params.id;
            const sbd = parseInt(req.params.sbd);

            const student = await StudentModel.update(
                { _id: _idClass },
                { $pull: { students: { sbd: sbd } } }
            );

            res.json(student);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

}

module.exports = faceHandles;