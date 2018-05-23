/*
 *  Contents:
 *  ----------
 *  Constructs the pipeline of trials to be executed.
 *  Randomizes trials in appropriate order.
 * 
 *  Control flow:
 *  -------------
 *  Welcome Screen (Also includes setting the participant id) --> Instruction pages --> 
 *  Practice Screen --> Practice Trials --> Ready Page --> Experiment trials --> End of experiment
 *  
 *  Trial:
 *  ------
 *  (Optional)[Break Start --> Break End --> ] Fixation Screen --> 
 *  Each line on a new page --> Audio Recording
 * 
 *  Help:
 *  ----
 *  This code uses jsPsych framework extensively. To learn jsPsych framework see jspsych.org.
 */

// Create timeline
var timeline = [];

// Welcome message trial
var welcome = {
    type: "html-keyboard-response",
    stimulus: '<p ' + STYLE + '> ' + WELCOME + ' </p>',
    on_finish: initAudio
};
timeline.push(welcome);

// Instructions trial (Each html string of the array occurs in a new page, see preferences.py)
for (var idx = 0; idx < INSTRUCTS.length; idx++) {
    timeline.push({
        type: "html-keyboard-response",
        stimulus: '<p ' + STYLE + '> ' + INSTRUCTS[idx] + ' </p>',
        choices: [' ']
    });
}

// Practice page welcome
var practice = {
    type: "html-keyboard-response",
    stimulus: '<p ' + STYLE + '> ' + PRACTICE + ' </p>',
    choices: [' ']
};
timeline.push(practice);

// Fixation screen before start of the trial
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: [' ']
};

// Display all practice trials.
// Note: No breaks, audio is not recorded and order of trials is not randomized.
// This means that all trials of a single experiment may be executed consecutively.
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
                '<p ' + STYLE + '> ' + START + ' </p>',
                choices: [' ']
            });

            // Stop recording
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<img id="record" src="' + record_img + '" class="recording">' +
                '<p ' + STYLE + '> ' + STOP + ' </p>',
                choices: [' ']
            });
        } else {
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<p> ' + cmd + ' </p>' +
                '<p ' + STYLE + '> ' + CONT + ' </p>',
                choices: [' ']
            });
        }
    }
}

// Ready page marks the start of real experiment trials.
var ready = {
    type: "html-keyboard-response",
    stimulus: '<p ' + STYLE + '> ' + READY + ' </p>',
    choices: [' ']
};
timeline.push(ready);

var break_start = {
    type: "html-keyboard-response",
    stimulus: '<p ' + STYLE + '> ' + BREAK_START + ' </p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000 * BREAK_INTVL
};

var break_end = {
    type: "html-keyboard-response",
    stimulus: '<p ' + STYLE + '> ' + BREAK_END + ' </p>',
    choices: [' ']
};

// This array tracks the number of trials completed of each experiment.
// This counter indexed by the experiment id indicates the next trial to be executed from the shuffled array.
var counters = [];

for (var idx = 0; idx < exp_list.length; idx++) {
    counters.push(0);
}

var prev_id = -1;
var cur_id;

// The choice of the next trial to display is pseudo random
// The constraint maintained is that as long as there are trials from
// more than one experiment, no two consecutive trials come from same experiment.
// Here we also assume that the condition arrays received are already shuffled at the back-end.
// Note: The outer loop is an indefinite while loop and the only exit is through break.
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

    // This variable is true iff all the trials are complete.
    if (complete) {
        break;
    }
    
    if (num_exps != 1) {
        // This while loop chooses a random different experiment id. We come here only if one such exists.
        while ((cur_id = Math.floor(Math.random() * exp_list.length)) == prev_id || 
            counters[cur_id] >= exp_list[cur_id].cond_list.length);
    }
    
    // Previous and current ids are to ensure no two trials with same experiment id appear
    // consecutively whenever possible.
    prev_id = cur_id;
    var exp = exp_list[cur_id];
    var cond = exp.cond_list[counters[cur_id]];
    counters[cur_id]++;

    // Execute a break.
    if ((break_idx != 0) && (break_idx % BREAK == 0)) {
        timeline.push(break_start);
        timeline.push(break_end);
    }

    timeline.push(fixation);

    // Execute all the commands of a trial
    // Commands are of two types 1. html string 2. audio record.
    for (var cmd_idx = 0; cmd_idx < cond.cmd_list.length; cmd_idx++) {
        var cmd = cond.cmd_list[cmd_idx];
        
        if (cmd == '>') {
            // Store folder and filename
            folders.push(exp.exp_name);
            filenames.push(cond.item + '_' + cond.cond);

            // Start recording
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<img id="record" src="' + record_img + '">' +
                '<p ' + STYLE + '> ' + START + ' </p>',
                choices: [' ']
            });

            // Stop recording
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<img id="record" src="' + record_img + '" class="recording">' +
                '<p ' + STYLE + '> ' + STOP + ' </p>',
                choices: [' '],
                on_start: startRecording,
                on_finish: stopRecording
            });
        } else {
            // Display html string
            timeline.push({
                type: 'html-keyboard-response',
                stimulus: '<p> ' + cmd + ' </p>' +
                '<p ' + STYLE + '> ' + CONT + ' </p>',
                choices: [' ']
            });
        }
    }
}

// End the experiment
var end = {
    type: "html-keyboard-response",
    stimulus: '<p ' + STYLE + '> ' + END + ' </p>',
    choices: jsPsych.NO_KEYS
};
timeline.push(end);

jsPsych.init({
    timeline: timeline
});
