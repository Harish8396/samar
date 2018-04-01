/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioRecorder = null;
var question = document.getElementById('question');
var controls = document.getElementById('controls');
var audio_index = 0;

function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
}

function gotBuffers(buffers) {
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding(blob) {
    var csrftoken = getCookie('csrftoken');
 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url, true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.setRequestHeader("index", audio_index++);

    xhr.upload.onloadend = function() {
        console.log('Upload complete');
    };

    xhr.send(blob);
}

function toggleRecording( e ) {
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );

        if (question_index == question_list.length) {
            end_test();
        } else {
            question.innerText = question_list[question_index++];
        }
    } else {
        // start recording
        if (!audioRecorder)
            return;
        e.classList.add("recording");
        audioRecorder.clear();
        audioRecorder.record();
    }
}

function gotStream(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    audioRecorder = new Recorder(input, {'workerPath': worker_path});
}

function initAudio() {
    if (question_index == question_list.length) {
        end_test();
    } else {
        question.innerText = question_list[question_index++];
    }

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

window.addEventListener('load', initAudio );

function end_test() {
    question.innerText = 'Your test has ended.';
    controls.hidden = true;
}