const userVideo = document.getElementById("User-Feed");
const startButton = document.getElementById("Btn-Start");
const paste = document.querySelector("#paste");
const state = { media: null };
const socket = io();
const input = document.querySelector("#inputKey");
const SetKey = document.querySelector("#SetKey");
const ClearKey = document.querySelector("#ClearKey");
let KEY;

// paste button
paste.addEventListener("click", async () => {
  input.value = await window.navigator.clipboard.readText();
  console.log(window.navigator.clipboard.readText());
});

// set key
SetKey.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    console.log(input.value.trim());
    SetKey.disabled = true;
    KEY = input.value.trim();

    SetKey.classList.add("bg-blue-200", "text-grey-200");
  }
});

// clear key
ClearKey.addEventListener("click", () => {
  if (SetKey.disabled == true) {
    SetKey.disabled = false;
    SetKey.classList.remove("bg-blue-200", "text-grey-200");
    input.value = "";
  }
});

// start button
startButton.addEventListener("click", () => {
  const mediaRecorder = new MediaRecorder(state.media, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    framerate: 25,
  });

  mediaRecorder.ondataavailable = (ev) => {
    console.log("Binary Stream Available", ev.data);
    socket.emit("binarystream", ev.data);
  };

  mediaRecorder.start(25);
});

// media renderer real time feeeder
window.addEventListener("load", async (e) => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  state.media = media;
  userVideo.srcObject = media;
});

module.exports = KEY;
