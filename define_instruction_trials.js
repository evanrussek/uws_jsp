
var instruction_pages_1a = ["Stimuli/Instructions_jpg/Slide1.jpg",
                            "Stimuli/Instructions_jpg/Slide2.jpg",
                            "Stimuli/Instructions_jpg/Slide3_GIRL.jpg",
                            "Stimuli/Instructions_jpg/Slide4_GIRL.jpg",
                            "Stimuli/Instructions_jpg/Slide5.jpg"];

var instruction_pages_1b = ["Stimuli/Instructions_jpg/Slide6_GIRL.jpg"];
var instruction_pages_1c = ["Stimuli/Instructions_jpg/Slide7.jpg"];



var outcome_state_idx = both_idx_vec[cond_idx][1];

var pos_outcome_assigments = [[0, 1, 2],
                                [2, 0, 1],
                                [1, 2, 0]];

var pages1a = [];
for (var i = 0; i < instruction_pages_1a.length; i++){
    pages1a.push('<img src= "'+ instruction_pages_1a[i] +  '" alt = "" >')
}
var pages1b = [];
for (var i = 0; i < instruction_pages_1b.length; i++){
    pages1b.push('<img src= "'+ instruction_pages_1b[i] +  '" alt = "" >')
}
var pages1c = [];
for (var i = 0; i < instruction_pages_1c.length; i++){
    pages1c.push('<img src= "'+ instruction_pages_1c[i] +  '" alt = "" >')
}

var instruction_pages1a = {
    type: 'instructions',
    pages: pages1a,
    show_clickable_nav: true
}

var instruction_pages1b = {
    type: 'instructions',
    pages: pages1b,
    show_clickable_nav: true
}

var instruction_pages1c = {
    type: 'instructions',
    pages: pages1c,
    show_clickable_nav: true
}

var instruc1a_trials = jsPsych.randomization.repeat([build_practice_trial_stg1(1,.2,true), build_practice_trial_stg1(2,.4,true),
    build_practice_trial_stg1(3,.6,true), build_practice_trial_stg1(4,.8,true)],1);

instruc1a_trials.splice(2,0,rand_gen_info_quiz());

var instruc1b_trials = [gen_rand_choice_trial(2, 4, 1,true),  gen_rand_choice_trial(1, 3, 2, true),
                        gen_rand_choice_trial(1, 4, 2, false),  gen_rand_choice_trial(1, 3, 2, false)];

var instruc_timeline = [instruction_pages1a].concat(instruc1a_trials)
instruc_timeline.push(instruction_pages1b);
instruc_timeline = instruc_timeline.concat(instruc1b_trials);
instruc_timeline.push(instruction_pages1c);
