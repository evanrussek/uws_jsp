var all_images = ["Stimuli/MEG_Stimuli/intermediate/In01.png",
                    "Stimuli/MEG_Stimuli/intermediate/In02.png",
                    "Stimuli/MEG_Stimuli/intermediate/In03.png",
                    "Stimuli/MEG_Stimuli/intermediate/In04.png",
                    "Stimuli/MEG_Stimuli/intermediate/In05.png",
                    "Stimuli/MEG_Stimuli/intermediate/In06.png",
                    "Stimuli/MEG_Stimuli/intermediate/In07.png",
                    "Stimuli/MEG_Stimuli/intermediate/In08.png",
                    "Stimuli/MEG_Stimuli/intermediate/In09.png",
                    "Stimuli/MEG_Stimuli/intermediate/In10.png",
                    "Stimuli/MEG_Stimuli/intermediate/In11.png",
                    "Stimuli/MEG_Stimuli/intermediate/In12.png",
                    "Stimuli/MEG_Stimuli/intermediate/In13.png",
                    "Stimuli/MEG_Stimuli/intermediate/In14.png",
                    "Stimuli/MEG_Stimuli/intermediate/In15.png",
                    "Stimuli/MEG_Stimuli/intermediate/In16.png",
                    "Stimuli/MEG_Stimuli/intermediate/In17.png",
                    "Stimuli/MEG_Stimuli/intermediate/In18.png",
                  ];

var thing_images = all_images.slice(0,7);

var thing_names = ["Wallet", "Scissors", "Suitcase", "Key",
                  "Marbles", "Barrell", "Zebra"];


var fractal_images = thing_images.slice(3,7);
var fractal_names = thing_names.slice(3,7);

var all_prob_o1 = [.2, .4, .6, .8];


// let's start with A vs D




var build_practice_trial_stg1 = function(choice_image, p_o1){
  // add a prompt ....
  this_trial ={
    type: 'evan-run-trial',
    stage: 'practice',
    first_stage: 2,
    last_stage:4,
    show_money_val: false,
    allow_reject: false,
    p_o1: p_o1, // this is always the same
    safe_val: 10,
    o1_val: 10,
    o2_val: 10, // because O2 is the trigger
    ///
    o1_image: thing_images[0],
    o2_image: thing_images[1],
    safe_image: thing_images[2],
    // this depends on the proability...
    choice_image: choice_image
  }
  return this_trial;
}


var build_po_vec = function(n_trials, p_o1){
  var n_o1_trials = n_trials*p_o1;
  var n_o2_trials = n_trials - n_o1_trials;
  var a_trials = new Array(n_o1_trials).fill(1);
  var po_vec = a_trials.concat(new Array(n_o2_trials).fill(0)); // shuffle it
  return po_vec;
}

practice_A = [];
// hard code in -- a v d
// a
n_trials_round = 20;
n_o1_trials = n_trials_round*all_prob_o1[0];
n_o2_trials = n_trials_round - n_o1_trials;
a_trials = new Array(n_o1_trials).fill(1);
a_trials_o1 = a_trials.concat(new Array(n_o2_trials).fill(0)); // shuffle it

a_trials_o1 = build_po_vec(10, all_prob_o1[0]);
// build a_trials
for (var t = 0; t < n_trials_round; t++){
  practice_A.push(build_practice_trial_stg1(fractal_images[0], a_trials_o1[t]));
}
// shuffle them


n_o1_trials = n_trials_round*all_prob_o1[0];
n_o2_trials = n_trials_round - n_o1_trials;
d_trials = new Array(n_o1_trials).fill(1);
d_trials_o1 = d_trials.concat(new Array(n_o2_trials).fill(0));

//jsPsych.randomization.repeat(all_trials, 1);
