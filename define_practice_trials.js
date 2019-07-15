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

var all_prob_o1 = [.2, .4, .6, .8];
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
    p_o1_c1: all_prob_o1[c1_number - 1],
    p_o1_c2: all_prob_o1[c2_number - 1],
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

var build_text_trial = function(line_1,line_2,line_3){
  var text_trial = {
    type: 'evan-display-text',
    line_1: line_1,
    line_2: line_2,
    line_3: line_3
  }
  return text_trial;
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


var gen_two_stim_block = function(c1_number, c2_number){

  // build 10 c1 only trials
  var start_block_text1 = "You'll now play the " + choice_names[c1_number - 1] + " and the " +
                              choice_names[c2_number - 1] + " slot machines.";
  var start_block_text2 = "For each game, press 1 to play the machine.";
  var start_block_text3 = "Please pay attention! There will be checks.";

  // build 10 c1 only trials
  var pre_choice_text1 = "You'll now make some choices between the two machines to earn points!";
  var pre_choice_text2 = "Press 1 to select the LEFT machine and 2 to select the RIGHT machine.";
  var pre_choice_text3 = "Please pay attention to the number of points for each outcome!";

  var practice_c1 = [];
  // 10 trials of 1
  var c1_trials_o1 = build_po_vec(10,all_prob_o1[c1_number - 1]);
  // build a_trials
  for (var t = 0; t < c1_trials_o1.length; t++){
    practice_c1.push(build_practice_trial_stg1(c1_number, c1_trials_o1[t]));
  }

  // build 10 c2 trials
  var practice_c2 = [];
  var c2_trials_o1 = build_po_vec(10,all_prob_o1[c2_number - 1]);
  // build a_trials
  for (var t = 0; t < c2_trials_o1.length; t++){
    practice_c2.push(build_practice_trial_stg1(c2_number, c2_trials_o1[t]));
  }

  // combine and shuffle c1 and c2 trials
  var practice_trials = practice_c1.concat(practice_c2)
  practice_trials = jsPsych.randomization.repeat(practice_trials, 1);

  // add in checks following some percent of practice trials
  var t_new = 0;
  var a = practice_trials.length;
  for (var t = 0; t < a; t++){
    t_new = t_new + 1;
    if (Math.random() < 0.33){
      practice_trials.splice(t_new,0,rand_gen_info_quiz())
      t_new = t_new + 1;
    }
  }

  practice_trials.unshift(build_text_trial(start_block_text1,start_block_text2,start_block_text3));

  // add choice trials at the end of the block
  var choice_trial_c1_better = gen_rand_choice_trial(c1_number, c2_number, 1);
  var choice_trial_c2_better = gen_rand_choice_trial(c1_number, c2_number, 2);


  // these are all framed in terms of approach, should we frame some in terms of avoid.... yes!
  var choice_trials = jsPsych.randomization.repeat([choice_trial_c1_better, choice_trial_c1_better,
                                                  choice_trial_c1_better, choice_trial_c1_better,
                                                  choice_trial_c2_better, choice_trial_c2_better,
                                                  choice_trial_c2_better, choice_trial_c2_better],1);

  choice_trials.unshift(build_text_trial(pre_choice_text1,pre_choice_text2,pre_choice_text3));


   var practice_block = practice_trials.concat(choice_trials);

   return practice_block

}

var practice_14 = gen_two_stim_block(1,2);

//var pt_test = [build_text_trial('hello!','HI', 'thats all')]

var pt_test = practice_14;

// change choice trials to 1 vs 2...
// monitor correct vs incorrect
// place message for when transitioning to some choices... and between blocks...
