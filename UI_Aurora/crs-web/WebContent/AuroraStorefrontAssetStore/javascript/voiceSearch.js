/*
 *-----------------------------------------------------------------
	=================================================================
	Copyright [2021] [HCL America, Inc.]
	=================================================================
 *-----------------------------------------------------------------
 */

var gumStream;
var rec;
var input;

 

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;

 
function startRecording() {
    console.log("recordButton clicked");
    var constraints = {
        audio: true,
        video: false
    }

     navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
     console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
     document.getElementById('recordButton').style.display = "none";
     document.getElementById('stopButton').style.display = "block";
    
     document.getElementById('no-wav').style.display = "none";
     document.getElementById('audio-wav').style.display = "block";
     audioContext = new AudioContext();


        gumStream = stream;

        input = audioContext.createMediaStreamSource(stream); 

        rec = new Recorder(input, {
            numChannels: 1
        })

         rec.record()

        console.log("Recording started");

     }).catch(function(err) {
         document.getElementById('recordButton').style.display = "block";
         document.getElementById('stopButton').style.display = "none";
    
         document.getElementById('no-wav').style.display = "block";
         document.getElementById('audio-wav').style.display = "none";
         console.log("Error in getUserMedia -"+err);
    });
}

 

 

function stopRecording() {
    console.log("stopButton clicked");
    document.getElementById('recordButton').style.display = "none";
    document.getElementById('stopButton').style.display = "block";
     
    rec.stop();

    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(sendAudioData);
    document.getElementById('VoiceModal').style.display = 'none';
}

 

function sendAudioData(blob) {
    console.log(blob);
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async function() {
        var base64data = new String(reader.result).split(",")[1];
        const rawResponse = await fetch('https://us-central1-commerce-product.cloudfunctions.net/app1/voice-transcribe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                audioBytes: base64data,
                channelCount: 1
            })
        });
        const content = await rawResponse.json();
        if(content.error){
            return;
        }
        var data = (Object.keys(content).length === 0) ? "No Data found..." : content.results[0].alternatives[0].transcript;
        document.getElementById("SimpleSearchForm_SearchTerm").value = data;
     
        if (data !== "No Data found...") {
            var form = document.forms['searchBox'];
            form.submit();
        }
    }

 

}

 

function showVoiceDialog() {
    var str = `<div id="VoiceModel" class="modal">
        <!-- Modal content -->
        <div class="modal-content" style="width:25%">
        <span class="close" onclick="document.getElementById('VoiceModal').style.display='none';">&times;</span>
        <div class="dialod-cls" role="dialog" aria-labelledby="simple-dialog-title">
        
        <div class="dialogContent-root">
        <div id="no-wav" style="margin:60px auto 20px;width:60%;border:1px solid #009874;"></div>
        <div id="audio-wav" style="padding:20px;display:none">
        <div id="audio-wav1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        </div>
        <div class="btn-group" style="display: flex; justify-content: center; align-items: center; text-align: center;">
        <span id="recordButton" class="icon" style="flex-direction:column" onclick="startRecording()">
        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="40px" height="44px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" style="transform: rotate(360deg);"><path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5h2z" fill="currentColor"></path></svg>
        <div>Press to Speak</div></span>
        <span id="stopButton" class="icon" style="display:none;flex-direction:column;" onclick="stopRecording()">
        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="40px" height="44px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" style="transform: rotate(360deg);"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8s-8-3.59-8-8s3.59-8 8-8M9 9v6h6V9" fill="currentColor"></path></svg>
        </span>
        </div>
        </div>
        </div>
        </div>
        </div>`;
    return str;
}

 

function openVoiceDialog() {
    if (document.getElementById('VoiceModal')) {
        document.getElementById('VoiceModal').remove();
    }
    var myDiv = document.createElement("div");
    myDiv.id = 'VoiceModal';
    myDiv.innerHTML = showVoiceDialog();
    document.body.appendChild(myDiv);

 

}
