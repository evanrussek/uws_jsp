
function rand_gen_rew_quiz_main(){

  // generate a reward trial as well
  // set each outcome reward
  //

  var tv_idx  = Math.round(4*Math.random());
  var safe_idx = Math.round(1*Math.random());
  var t_val = all_win_amounts[tv_idx] + -5 + Math.round(10*Math.random());
  var other_val = Math.round(8*Math.random());
  var safe_val = all_win_safe_vals[safe_idx] + - 5 +Math. round(10*Math.random());
  var lure_val = -50 + Math.round(100*Math.random())

  if (Math.random() < 0.5){t_val = -1*t_val; safe_val = -1*safe_val; other_val = -1*other_val};
  if (Math.random() < .5){o1_val = t_val, o2_val = other_val}
  else{o1_val = other_val, o2_val = t_val}

  var these_outcome_vals = [o1_val, o2_val, safe_val];
  var these_outcome_names = [outcome_names[0], outcome_names[1], outcome_names[2]];
  var these_outcome_imgs = [outcome_images[0], outcome_images[1], outcome_images[2]];


  var outcome_idx = Math.round(2*Math.random());
  var this_outcome_val = these_outcome_vals[outcome_idx];
  var this_outcome_img = these_outcome_imgs[outcome_idx];
  var this_outcome_text = these_outcome_names[outcome_idx];

  var all_other_vals = [o1_val, o2_val].concat([safe_val, lure_val]);
  all_other_vals.splice(outcome_idx,1);

 var use_image = (Math.random() < .5);

 this_trial = {
   type: 'evan-run-trial',

   data:{
     phase:'REW TEST 1',
   },
   first_stage: 1,
   last_stage:1,
   show_money_val: true,
   allow_reject: true,
   // these define the trial in the frame useful for analysis
   safe_val_base: all_win_safe_vals[sv_idx], // not the actual val
   p_trigger: all_prob_o1[p_idx], // here p_o1 corresponds to the trigger prob
   trigger_val: all_win_amounts[tv_idx], // win trial
   o1_trigger: null,
   safe_noise: null,
   trigger_noise: null,
   other_noise: null,
   /// define it in terms useful for actually running the trial
   /// which stimulus do we want?
   p_o1: 0,
   safe_val: safe_val,
   o1_val: o1_val, // because O1 is the trigger
   o2_val: o2_val,
   ///
   o1_image: outcome_images[0], // set per subject, using subject number -- need to counterbalance this...
   o2_image: outcome_images[1], //
   safe_image: outcome_images[2],
   // this depends on the proability...
   choice_image: choice_images[1] // each choice image corresponds to a probability for o1
 }


  var reward_quiz = {
    type: 'evan-reward-quiz',
    outcome_image: this_outcome_img,
    outcome_name: this_outcome_text,
    outcome_val: this_outcome_val,
    other_vals: all_other_vals,
    use_image: use_image
  }

  return([this_trial, reward_quiz])
}



function rand_gen_trial(){

  // generate a reward trial as well
  // set each outcome reward
  //

  var tv_idx  = Math.round(4*Math.random());
  var safe_idx = Math.round(1*Math.random());
  var t_val = all_win_amounts[tv_idx] + -5 + Math.round(10*Math.random());
  var other_val = Math.round(8*Math.random());
  var safe_val = all_win_safe_vals[safe_idx] + - 5 +Math. round(10*Math.random());
  var lure_val = -50 + Math.round(100*Math.random())

  if (Math.random() < 0.5){t_val = -1*t_val; safe_val = -1*safe_val; other_val = -1*other_val};
  if (Math.random() < .5){o1_val = t_val, o2_val = other_val}
  else{o1_val = other_val, o2_val = t_val}

  var these_outcome_vals = [o1_val, o2_val, safe_val];
  var these_outcome_names = [outcome_names[0], outcome_names[1], outcome_names[2]];
  var these_outcome_imgs = [outcome_images[0], outcome_images[1], outcome_images[2]];


  var outcome_idx = Math.round(2*Math.random());
  var this_outcome_val = these_outcome_vals[outcome_idx];
  var this_outcome_img = these_outcome_imgs[outcome_idx];
  var this_outcome_text = these_outcome_names[outcome_idx];

  var all_other_vals = [o1_val, o2_val].concat([safe_val, lure_val]);
  all_other_vals.splice(outcome_idx,1);

  var choice_number = 1 + Math.round(3*Math.random());

 var use_image = (Math.random() < .5);



 this_trial = {
   type: 'evan-run-trial',

   data:{
     phase:'REW TEST 1',
   },
   first_stage: 1,
   last_stage:4,
   show_money_val: true,
   allow_reject: true,
   // these define the trial in the frame useful for analysis
   safe_val_base: all_win_safe_vals[sv_idx], // not the actual val
   p_trigger: all_prob_o1[p_idx], // here p_o1 corresponds to the trigger prob
   trigger_val: all_win_amounts[tv_idx], // win trial
   o1_trigger: null,
   safe_noise: null,
   trigger_noise: null,
   other_noise: null,
   /// define it in terms useful for actually running the trial
   /// which stimulus do we want?
   p_o1: all_prob_o1[choice_number - 1],
   safe_val: safe_val,
   o1_val: o1_val, // because O1 is the trigger
   o2_val: o2_val,
   ///
   o1_image: outcome_images[0], // set per subject, using subject number -- need to counterbalance this...
   o2_image: outcome_images[1], //
   safe_image: outcome_images[2],
   // this depends on the proability...
   choice_image: choice_images[choice_number - 1] // each choice image corresponds to a probability for o1
 }

  return(this_trial)
}



var gen_test_trial = function(o1_trig, prob_trig_idx, trig_val, matched_safe, safe_val_base){
  // need to define choice number, p_o1, o1_val, o2_val (that's it?)
  var prob_trig = all_prob_trig[prob_trig_idx];


  if (trig_val > 0){
    var other_noise = Math.round(5*Math.random());
    var gl_type = 'gain';
  } else {
      var other_noise = -1*Math.round(5*Math.random());
      var gl_type = 'loss';
  }


  if (matched_safe){
    var safe_val_base = Math.round(prob_trig*trig_val);
    // set the noise...
    var safe_noise = Math.round(3*Math.random() - 1.5);
    var trigger_noise = Math.round(3*Math.random() - 1.5);
    if (trig_val > 0){
      var other_noise = Math.round(2*Math.random());
    }else{
      var other_noise = -1*Math.round(2*Math.random());
    }
  } else{
    var safe_noise = Math.round(10*Math.random() - 5);
    var trigger_noise = Math.round(10*Math.random() - 5);
  }


  if (o1_trig){
    // o1 is the trigger, o2 is 0
    var o1_val_base = trig_val;
    var o1_val = o1_val_base + trigger_noise;
    var o2_val_base = 0;
    var o2_val = o2_val_base + other_noise;
    var p_o1 = prob_trig;
    var choice_number = 1 + prob_trig_idx; //
  } else{
    // o2 is the trigger, o1 is 0
    var o1_val_base = 0;
    var o1_val = o1_val_base + other_noise;
    var o2_val_base = trig_val;
    var o2_val = o2_val_base + trigger_noise;
    var p_o1 = 1 - prob_trig;
    var choice_number = 1 + (3 - prob_trig_idx);
  }

  this_trial = {
      type: 'evan-run-trial',

      data: {
        // these define the trial in the frame useful for analysis
        safe_val_base: safe_val_base, // not the actual val
        safe_val_actual: safe_val_base + safe_noise,
        p_trigger: prob_trig, // here o2 is the trigger
        trigger_val_base: trig_val,
        trigger_val_actual: trig_val + trigger_noise,
        o1_trigger: o1_trig,
        safe_noise: safe_noise,
        trigger_noise: trigger_noise,
        other_noise: other_noise,
        phase:'TEST',
        matched_safe: matched_safe,
        gl_type: gl_type,
        choice_number: choice_number
      },

      first_stage: 1,
      last_stage:4,
      show_money_val: true,
      allow_reject: true,
      p_o1: p_o1, // this is always the same
      safe_val: safe_val_base + safe_noise,
      o1_val: o1_val,
      o2_val: o2_val, // because O2 is the trigger
      o1_image: outcome_images[0],
      o2_image: outcome_images[1],
      safe_image: outcome_images[2],
      choice_image: choice_images[choice_number - 1]
    }
    return this_trial;
}

// make a function that takes in trigger_val, p_trigger, gain or loss, o1_trigger and generates a trial.
var o1_trig = true;
var prob_trig_idx = 2;
var matched_safe = false;
var trig_val = 50;

test_trial_o1 = gen_test_trial(o1_trig, prob_trig_idx, trig_val, matched_safe,30)
test_trial_o2 = gen_test_trial(false, prob_trig_idx, trig_val, matched_safe,25)

// this is constant for all subjects (160 trials)
var all_prob_o1 = [.2, .4, .6, .8];
var all_prob_trig =  [.2, .4, .6, .8];
var all_win_safe_vals = [16, 32];
var all_loss_safe_vals = [-16, -32];
var all_win_amounts = [34, 46, 57, 68, 80];
var all_loss_amounts = [-34, -46, -57, -68, -80];

// this loop makes 120 trials match trials...
var matched_trials = [];
var alt_idx = 0;
for (var p_idx = 0; p_idx < all_prob_trig.length; p_idx++){
  for (var w_idx = 0; w_idx < all_win_amounts.length; w_idx++){
    // o1_trig is true and matched safe is true
    alt_idx = alt_idx + 1;
    var match_w_o1 = gen_test_trial(true, p_idx, all_win_amounts[w_idx], true);
    // o1_trig is false and matched safe is true
    var match_w_o2 = gen_test_trial(false, p_idx, all_win_amounts[w_idx], true);
    // o1_trig alternates and matched safe is true
    var alt_o1_trig = Boolean(alt_idx % 2);
    var match_w_alt = gen_test_trial(alt_o1_trig, p_idx, all_win_amounts[w_idx], true);
    matched_trials = matched_trials.concat([match_w_o1, match_w_o2, match_w_alt]);

    // just make the loss one's here as well
    var match_l_o1 = gen_test_trial(true, p_idx, all_loss_amounts[w_idx], true);
    var match_l_o2 = gen_test_trial(false, p_idx, all_loss_amounts[w_idx], true);
    var match_l_alt = gen_test_trial(alt_o1_trig, p_idx, all_loss_amounts[w_idx], true);
    matched_trials = matched_trials.concat([match_l_o1, match_l_o2, match_l_alt]);
  }
}

// generates 160 non-matched trials
var non_matched_trials = []; // remake the other trials...
// win_o1_trig_trials
for (var sv_idx = 0; sv_idx < all_win_safe_vals.length; sv_idx++){
  for (var w_idx = 0; w_idx < all_win_amounts.length; w_idx++){
    for (var p_idx = 0; p_idx < all_prob_trig.length; p_idx++){
      var nm_w_o1 =  gen_test_trial(true, p_idx, all_win_amounts[w_idx], false, all_win_safe_vals[sv_idx]);
      var nm_w_o2 =  gen_test_trial(false, p_idx, all_win_amounts[w_idx], false, all_win_safe_vals[sv_idx]);

      var nm_l_o1 =  gen_test_trial(true, p_idx, all_loss_amounts[w_idx], false, all_loss_safe_vals[sv_idx]);
      var nm_l_o2 =  gen_test_trial(false, p_idx, all_loss_amounts[w_idx], false, all_loss_safe_vals[sv_idx]);

      non_matched_trials = non_matched_trials.concat([nm_w_o1, nm_w_o2, nm_l_o1, nm_l_o2]);
    }
  }
}


// make the matched trials...
// loop through trigger vals and p_os, gain, loss


// 280 trials...
var all_trials = matched_trials.concat(non_matched_trials);
//var all_trials_shuff =  all_trials.slice(0,2);
// add trial_number
// should we be counterbalancing order in some way? // also want a few breaks maybe
var main_task = jsPsych.randomization.repeat(all_trials, 1);
//var all_trials_shuff = all_trials;
// insert a half way through

for (var tn = 0; tn < main_task.length; tn++){
  var b = tn;
  main_task[tn].data.trial_num = b+1;
}

// add random reward quizes into choice_trial quizes
var t_new1 = 0;
var a = main_task.length;
for (var t = 1; t < a; t++){
  t_new1 = t_new1 + 1;
  if (Math.random() < 1/8){
    var quiz = rand_gen_rew_quiz_main();
    main_task.splice(t_new1,0, quiz[0], quiz[1]);
    t_new1 = t_new1 + 1;
  }
}

// add more than just half way marks - maybe 1/4 parts
quart_text = build_text_trial("Great job! You're a quarter of the way through this part of the task.","","",true);
half_way_txt = build_text_trial("Great job! You're half way through this part of the task.","","",true);
three_quart_text = build_text_trial("Great job! You're three quarters of the way through this part of the task.","","",true);

main_task.splice(Math.round(main_task.length/4), 0, quart_text)
main_task.splice(Math.round(main_task.length/2)+1, 0, half_way_txt)
main_task.splice(Math.round(3*main_task.length/4)+2, 0, three_quart_text)

task2_timeline = main_task;
//test_quiz = rand_gen_rew_quiz_main();
