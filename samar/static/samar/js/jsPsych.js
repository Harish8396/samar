/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome = {
    type: "html-keyboard-response",
    stimulus: "<p>" + WELCOME + "</p>",
    on_finish: initAudio
};
timeline.push(welcome);

/* define instructions trial */
for (var idx = 0; idx < INSTRUCTS.length; idx++) {
    timeline.push({
        type: "html-keyboard-response",
        stimulus: INSTRUCTS[idx],
        choices: [' ']
    });
}

/* practice test */
var practice = {
    type: "html-keyboard-response",
    stimulus: "<p>" + PRACTICE + "</p>",
    choices: [' ']
};
timeline.push(practice);

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: [' ']
};

for (var idx = 0; idx < practice_list.length; idx++) {
    timeline.push(fixation);
    var cmd_list = practice_list[idx].cmd_list;

    for (var cmd_idx = 0; cmd_idx < cmd_list.length; cmd_idx++) {
        var cmd = cmd_list[cmd_idx];
        
        if (cmd == '>') {

            // Start recording
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<img id="record" src="' + record_img + '">' +
                '<p> ' + START + ' </p>',
                choices: [' ']
            });

            // Stop recording
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<img id="record" src="' + record_img + '" class="recording">' +
                '<p> ' + STOP + ' </p>',
                choices: [' ']
            });
        } else {
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<p> ' + cmd + ' </p>' +
                '<p> ' + CONT + ' </p>',
                choices: [' ']
            });
        }
    }
}

/* test trials */
var ready = {
    type: "html-keyboard-response",
    stimulus: "<p>" + READY + "</p>",
    choices: [' ']
};
timeline.push(ready);

var break_start = {
    type: "html-keyboard-response",
    stimulus: "<p>" + BREAK_START + "</p>",
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000 * BREAK_INTVL
};

var break_end = {
    type: "html-keyboard-response",
    stimulus: "<p>" + BREAK_END + "</p>",
    choices: [' ']
};

var counters = [];

for (var idx = 0; idx < exp_list.length; idx++) {
    counters.push(0);
}

var prev_id = -1;
var cur_id;

for (var break_idx = 0; true; break_idx++) {
    var complete = true;
    var num_exps = 0;
    var cur_id;

    for (var exp_idx = 0; exp_idx < exp_list.length; exp_idx++) {
        if (counters[exp_idx] < exp_list[exp_idx].cond_list.length) {
            complete = false;
            num_exps++;
            cur_id = exp_idx;
            break;
        }
    }

    if (complete) {
        break;
    }
    
    if (num_exps != 1) {
        while ((cur_id = Math.floor(Math.random() * exp_list.length)) == prev_id || 
            counters[cur_id] >= exp_list[cur_id].cond_list.length);
    }
    
    prev_id = cur_id;
    var exp = exp_list[cur_id];
    var cond = exp.cond_list[counters[cur_id]];
    counters[cur_id]++;

    if ((break_idx != 0) && (break_idx % BREAK == 0)) {
        timeline.push(break_start);
        timeline.push(break_end);
    }

    timeline.push(fixation);

    for (var cmd_idx = 0; cmd_idx < cond.cmd_list.length; cmd_idx++) {
        var cmd = cond.cmd_list[cmd_idx];
        
        if (cmd == '>') {
            folders.push(exp.exp_name);
            filenames.push(cond.item + '_' + cond.cond);

            // Start recording
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<img id="record" src="' + record_img + '">' +
                '<p> ' + START + ' </p>',
                choices: [' ']
            });

            // Stop recording
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<img id="record" src="' + record_img + '" class="recording">' +
                '<p> ' + STOP + ' </p>',
                choices: [' '],
                on_start: startRecording,
                on_finish: stopRecording
            });
        } else {
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<p> ' + cmd + ' </p>' +
                '<p> ' + CONT + ' </p>',
                choices: [' ']
            });
        }
    }
}

/* for (var exp_idx = 0; exp_idx < exp_list.length; exp_idx++) {
    var exp = exp_list[exp_idx];
    for (var cond_idx = 0; cond_idx < exp.cond_list.length; cond_idx++) {
        // Display fixation before each condition
        timeline.push(fixation);

        var cond = exp.cond_list[cond_idx];
        for (var cmd_idx = 0; cmd_idx < cond.cmd_list.length; cmd_idx++) {
            var cmd = cond.cmd_list[cmd_idx];
            
            if (cmd == '>') {
                folders.push(exp.exp_name);
                filenames.push(cond.item + '_' + cond.cond);

                // Start recording
                timeline.push({
                    type: 'html-keyboard-response',
                    stimulus: '<img id="record" src="' + record_img + '">' +
                    '<p> Press SPACE BAR to START recording. </p>',
                    choices: [' ']
                });

                // Stop recording
                timeline.push({
                    type: 'html-keyboard-response',
                    stimulus: '<img id="record" src="' + record_img + '" class="recording">' +
                    '<p> Press SPACE BAR to STOP recording. </p>',
                    choices: [' '],
                    on_start: function(data) {
                        startRecording(data);
                    },
                    on_finish: stopRecording
                });
            } else {
                timeline.push({
                    type: 'html-keyboard-response',
                    stimulus: cmd,
                    choices: [' ']
                });
            }
        }
    }
} */

var end = {
    type: "html-keyboard-response",
    stimulus: "<p>" + END + "</p>",
    choices: jsPsych.NO_KEYS
};
timeline.push(end);

jsPsych.init({
    timeline: timeline
});
