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

var thing_names = ["Wallet", "Scissors", "Suitcase", "Key",
                    "Marbles", "Barrell", "Zebra"];


var thing_images = all_images.slice(0,7);

var outcome_images = thing_images.slice(0,3);
var outcome_names = thing_names.slice(0,3);





var choice_images = thing_images.slice(3,7);
var choice_names = thing_names.slice(3,7);

var all_prob_o1 = [0, .4, .6, 1];
practice_trials = [];

// let's start with A vs D


var build_practice_trial_stg1 = function(choice_number, p_o1){
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
    choice_image: choice_images[choice_number-1],
    data: {choice_number: choice_number}
  }

  return this_trial;
}

// these will play out to true probabilities
var build_choice_trial = function(c1_number, c2_number, o1_val, o2_val, better_im){
  var choice_trial = {
    type: 'evan-two-stim-choice',
    first_stage: 1,
    last_stage: 4,
    o1_val: o1_val,
    o2_val: o2_val,
    p_o1_c1: 0,
    p_o1_c2: 1,
    o1_image: thing_images[0],
    o2_image: thing_images[1],
    c1_image: choice_images[c1_number - 1],
    c2_image: choice_images[c2_number - 1],
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

var gen_rand_choice_trial = function(c1, c2, which_better){
  // constraints: c1 < c2
  if (which_better == 1){
    // reward should be on 1
    choice_trial = build_choice_trial(c1,c2,0,10,1);
  }else{
    choice_trial = build_choice_trial(c1,c2,10,0,2);
  }
  return choice_trial;
}
// add some info checks to the practice trials

function rand_gen_info_quiz(){

  if (Math.random() < .5){
    // quiz on outcome // need to access last outcome
    var info_quiz = {
      type: 'evan-info-quiz',
      correct_image: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        return thing_images[data.outcome_reached-1];
      },
      other_images:  function(){var data = jsPsych.data.get().last(1).values()[0]; var rm_idx = data.outcome_reached-1;
                      var cp_oi = [...outcome_images]; cp_oi.splice(rm_idx,1); return cp_oi; },
      correct_name: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        return thing_names[data.outcome_reached-1];
      },
      other_names: function(){var data = jsPsych.data.get().last(1).values()[0]; var rm_idx = data.outcome_reached-1;
                      var cp_on = [...outcome_names]; cp_on.splice(rm_idx,1); return cp_on; },

      use_image: (Math.random() < .5),
      use_outcome: true
    }
  }else{
    var info_quiz = {
    // do it for choice
    type: 'evan-info-quiz',
    correct_image: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      return choice_images[data.choice_number-1];
    },
    other_images:  function(){var data = jsPsych.data.get().last(1).values()[0]; var rm_idx = data.choice_number-1;
                    var cp_oi = [...choice_images]; cp_oi.splice(rm_idx,1); return cp_oi; },
    correct_name: function(){
      var data = jsPsych.data.get().last(1).values()[0];
      return choice_names[data.choice_number-1];
    },
    other_names: function(){var data = jsPsych.data.get().last(1).values()[0]; var rm_idx = data.choice_number-1;
                    var cp_on = [...choice_names]; cp_on.splice(rm_idx,1); return cp_on; },

    use_image: (Math.random() < .5), // random iamge or text
    use_outcome: false
  }
  }
  return info_quiz;
}


practice_A1 = [];
a_trials_o1 = build_po_vec(20,all_prob_o1[0]);
// build a_trials
for (var t = 0; t < a_trials_o1.length; t++){
  practice_A1.push(build_practice_trial_stg1(1, a_trials_o1[t]));
}
// shuffle them
practice_D1 = [];
d_trials_o1 = build_po_vec(20,all_prob_o1[3]);
// build a_trials
for (var t = 0; t < a_trials_o1.length; t++){
  practice_D1.push(build_practice_trial_stg1(4, d_trials_o1[t]));
}


// figure out whether correctness is correct
choice_trial1 = gen_rand_choice_trial(1, 4, 1);
choice_trial2 = gen_rand_choice_trial(1, 4, 2);

practice_trials = practice_A1.concat(practice_D1)
practice_trials = jsPsych.randomization.repeat(practice_trials, 1);


// loop through practice trials, place a random info quiz in 25% of the spots

var t_new = 0;
a = practice_trials.length;
for (var t = 0; t < a; t++){
  var t_new = t_new + 1;
  if (Math.random() < 0.33){
    practice_trials.splice(t_new,0,rand_gen_info_quiz())
    console.log(t_new)
    var t_new = t_new + 1;
  }
}

//practice_trials.splice(1, 0, info_quiz2);
pt_test = practice_trials;
choice_trials_AD = jsPsych.randomization.repeat([choice_trial1, choice_trial1, choice_trial1, choice_trial1, choice_trial1, choice_trial2, choice_trial1, choice_trial2, choice_trial1, choice_trial2],1);
practice_trials = practice_trials.concat(choice_trials_AD);
//pt_test = choice_trials_AD;
pt_test = practice_trials;
// change choice trials to 1 vs 2...
// monitor correct vs incorrect
// place message for when transitioning to some choices...
