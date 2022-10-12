const videoEl = document.getElementById('inputVideo');

// load the models
async function init() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
}

init();

// function init(){
//     console.log(faceapi)

//     // try to access users webcam and stream the images
//     // to the video element
//     navigator.getUserMedia(
//         { video:     {} },
//         stream => videoEl.srcObject = stream,
//         err => console.error(err)
//     );
    // const mtcnnForwardParams = {
    //     // limiting the search space to larger faces for webcam detection
    //     minFaceSize: 200
    // }
    // const mtcnnResults = faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams);
    // faceapi.drawDetection('overlay', mtcnnResults.map(res => res.faceDetection), { withScore: false })
    // faceapi.drawLandmarks('overlay', mtcnnResults.map(res => res.faceLandmarks), { lineWidth: 4, color: 'red' })
    // return true;
// };

videoEl.addEventListener('play', async (e) => {
    console.log('sá')
});