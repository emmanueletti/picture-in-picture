// Cached DOM elements
const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt user to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    // Ask user what media stream they would like streamed into the video element
    videoElement.srcObject = mediaStream;

    // Once video is fully loaded, run the callback function that triggers video
    // play
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (err) {
    console.log(err);
  }
}

// Event listeners
window.addEventListener('load', selectMediaStream);

// Instead of triggering picture in picture via the video controls, user can
// trigger it using the button
button.addEventListener('click', async () => {
  button.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  videoElement.hidden = true;
  // Reset button
  button.disabled = false;
});
