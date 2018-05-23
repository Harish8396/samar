/*
 *  Contents:
 *  --------
 *  Contains logic to perform audio operations.
 *  Makes appropriate ajax requests to back-end (audio upload, get and set participant id)
 * 
 *  Note:
 *  -----
 *  Make sure audio context resumes after user interaction is available.
 *  Run and Tested on chrome, (unsure of correct execution on any other browser).
 */

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
var audioRecorder = null;
var audio_index;
var folders = [];
var filenames = [];
var participant_id;

function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
}

function gotBuffers(buffers) {
    audioRecorder.exportWAV( doneEncoding );
}

// Ajax request to upload url.
// Header contains the following fields
//  participant id, folder name, filename and a mandatory csrf field (required by django)
function doneEncoding(blob) {
    var csrftoken = getCookie('csrftoken');
 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("id", participant_id);
    var folder = folders[audio_index];
    var filename = filenames[audio_index];
    audio_index++;
    xhr.setRequestHeader("folder", folder);
    xhr.setRequestHeader("filename", filename);

    xhr.upload.onloadend = function() {
        console.log('Upload complete');
    };

    xhr.send(blob);
}

function startRecording(data) {
    // start recording
    if (!audioRecorder)
        return;
    audioRecorder.clear();
    audioRecorder.record();
}

function stopRecording(data) {
    // stop recording
    audioRecorder.stop();
    $('#record').removeClass("recording");
    audioRecorder.getBuffers(gotBuffers);
}

function gotStream(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    audioRecorder = new Recorder(input, {'workerPath': worker_path});
}

// Called in the onfinish callback of welcome screen
// This is done to construct audio context after user interaction takes place.
function initAudio(data) {
    audioContext = new AudioContext();
    audio_index = 0;

    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

// Ajax request to obtain participant id
function getParticipantId() {
    $.ajax({
        url: get_latest_url,
        data: {},
        dataType: 'json',
        success: function (data) {
            participant_id = prompt('Enter participant id:', data.id);

            if (participant_id == null) {
                participant_id = parseInt(data.id);
            } else {
                participant_id = parseInt(participant_id);  
            } 
            
            if (participant_id == data.id) {
                setParticipantId(participant_id);
            } else {
                if (confirm('Sure you want to override?')) {
                    setParticipantId(participant_id);
                } else {
                    location.reload();
                }
            }
        }
    });
}

// Ajax request to set participant id
function setParticipantId(participant_id) {
    $.ajax({
        url: set_latest_url,
        data: {'id': participant_id},
        dataType: 'json',
        success: function (data) {
            // initAudio();
        }
    });
}

window.addEventListener('load', getParticipantId);