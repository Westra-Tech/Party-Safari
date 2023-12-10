// // npm getusermedia package: https://www.npmjs.com/package/getusermedia
// // first deal with browser prefixes
try {
    // const jsQR = require("jsqr");
    // const getUserMedia = require('getusermedia');

    const imp = document.getElementById('imp');
    imp.innerHTML = 'imported';
} catch (error) {
    console.log('fail');

    
}

// console.log('fail');
// const jsQR = require("jsqr");
// const getUserMedia = require("getusermedia");

let getUserMedia = navigator.getUserMedia || 
    navigator.mozGetUserMedia || 
    navigator.webkitGetUserMedia;

 
// make sure it's supported and bind to navigator
if (getUserMedia) {
    getUserMedia = getUserMedia.bind(navigator);
} else {
    // have to figure out how to handle the error somehow
}

// then deal with a weird, positional error handling API
getUserMedia(
    // media constraints
    {video: true, audio: false}, 
    // success callback
    function (stream) {
        // gets stream if successful
        const videoElement = document.getElementById('video');
        const result = document.getElementById('result');
        // const canvas = document.getElementById('canvas');
        


        videoElement.srcObject = stream;

        // result.innerHTML = "hi";      

        function scanQRCode() {
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            // context.drawImage(video, 0, 0, canvas.width, canvas.height);
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
            // result.innerHTML = imageData;      
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            result.innerHTML = code;
            // code = true;
      
            if (code) {
                result.innerHTML = 'QR code detected: \n' + code.data;
              // Perform desired actions with the QR code data
            }else{
                result.innerHTML = 'no detection';
            }
      
            requestAnimationFrame(scanQRCode);
        }

        function test(){
            result.innerHTML = 'nothing';
        }

        // event listener
        videoElement.addEventListener('play', () => {
            // canvas.width = videoElement.videoWidth;
            // canvas.height = videoElement.videoHeight;
            scanQRCode();
        });

        
      
    }, 
    // error callback
    function (error) {
        // called if failed to get media
    }
)

