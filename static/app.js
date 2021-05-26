var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var savePNGButton = wrapper.querySelector("[data-action=save-png]");
var canvas = wrapper.querySelector("canvas");
console.log(canvas.width);
console.log(canvas.height);
canvas.width = 300;
canvas.height = 300;
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  minWidth: 5,
  maxWidth: 10,
  backgroundColor: 'rgb(255, 255, 255)'
});
var predictionForm = document.getElementById("predictionDataWrapper");
var hiddenBlobData = document.getElementById("signatureBlob");
var predictLink = document.getElementById("say");
var targetAlphabet = document.getElementById("targetAlphabet");

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var context = canvas.getContext("2d"); //context.getImageData(0,0,canvas.width,canvas.height)
        var imgData = signaturePad ? signaturePad.toData() : null;
        // var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        var ratio = 2;
        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;
        context.scale(ratio, ratio);
        // context.putImageData(imgData,0,0);
        imgData && signaturePad.fromData(imgData);
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
// resizeCanvas();

function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL();
    hiddenBlobData.value = dataURL;
    predictionForm.submit();    
  }
});

var getAlphabetToSay = function(){
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomIndex = Math.random()*26;
  var alphabet = chars.charAt(Math.floor(randomIndex));
  console.log(alphabet);
  return alphabet;
}

predictLink.addEventListener("click",function(event){
  event.preventDefault();
  var text = getAlphabetToSay();
  var url = "https://translate.google.com/translate_tts?ie=UTF-8&tl=en-US&client=tw-ob&q="+text;
  targetAlphabet.value = text;
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
})