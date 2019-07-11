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


var build_practice_trial_stg1 = function(choice_number,choice_image, p_o1){
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
    choice_image: fractal_images[choice_number-1],
    choice_number: choice_number,
  }

  return this_trial;
}

// these will play out to true probabilities
var build_choice_trial = function(c1_number, c2_number, o1_val, o2_val, better_im){
  var choice_trial = {
    type: 'evan-two-stim-choice',
    first_stage: 1,
    last_stage: 4,
    o1_val: 10,
    o2_val: 2,
    p_o1_c1: .3,
    p_o1_c2: .7,
    o1_image: thing_images[0],
    o2_image: thing_images[1],
    c1_image: fractal_images[c1_number - 1],
    c2_image: fractal_images[c2_number - 1],
    choice_prompt: true,
    info_prompt: true,
    correct_machine: better_im
  }
  return choice_trial;

}


var build_po_vec = function(n_trials, p_o1){
  var n_o1_trials = n_trials*p_o1;
  var n_o2_trials = n_trials - n_o1_trials;
  var a_trials = new Array(n_o1_trials).fill(1);
  var po_vec = a_trials.concat(new Array(n_o2_trials).fill(0)); // need to shuffle it later
  return po_vec;
}


practice_A1 = [];
a_trials_o1 = build_po_vec(10,all_prob_o1[0]);
// build a_trials
for (var t = 0; t < a_trials_o1.length; t++){
  practice_A1.push(build_practice_trial_stg1(1, a_trials_o1[t]));
}
// shuffle them
practice_D1 = [];
d_trials_o1 = build_po_vec(10,all_prob_o1[3]);
// build a_trials
for (var t = 0; t < a_trials_o1.length; t++){
  practice_D1.push(build_practice_trial_stg1(4,fractal_images[3], d_trials_o1[t]));
}

// figure out whether correctness is correct
choice_trial1 = build_choice_trial(1, 4, 10, 0, 1 + (1 < 4));
choice_trial2 = build_choice_trial(1, 4, 0, 10, 1 + (1 < 4));
choice_trial3 = build_choice_trial(1, 4, 10, 0, 1 + (1 < 4));
choice_trial4 = build_choice_trial(1, 4, 10, 0, 1 + (1 < 4));

choice_trials_AD = jsPsych.randomization.repeat([choice_trial1, choice_trial2, choice_trial3, choice_trial4],1);
// some choice trials

practice_trials = practice_A1.concat(practice_D1)
practice_trials = jsPsych.randomization.repeat(practice_trials, 1);

// add some info checks to the practice trials
// pick a trial number


tn = 8;

// if rand < .5

//if (Math.random() < .5){
  // quiz on outcome // need to access last outcome
//  var data = jsPsych.data.get().last(1).values()[0];
  var info_quiz2 = {
    type: 'evan-info-quiz',
    on_start: function(){ data = jsPsych.data.get().last(1).values()[0] },
    correct_image: thing_images[data.outcome_reached-1],
    other_images: [thing_images[1], thing_images[2]],
    correct_name: thing_names[data.outcome_reached-1],
    other_names: [thing_names[1], thing_names[2]],
    use_image: false,
    use_outcome: true
  }
//  }
//}else{// quiz on choice
//  console.log('hi')
//}

practice_trials.splice(1, 0, info_quiz2);

console.log(practice_trials)



//choice_trials_AD = jsPsych.randomization.repeat([choice_trial1, choice_trial2, choice_trial3, choice_trial4],1);

//practice_trials = practice_trials.concat(choice_trials_AD);
