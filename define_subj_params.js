// this could also be a trial // for the scanner, add the date and time, and other info

// mememee
var subject_num = 1; // need to get this from JSPSYCH
var date = 'aug_14_2019';
var time = '1651';

var cond_idx = subject_num%12;

var both_idx_vec = [[0,0], [0,1], [0,2],
      [1,0], [1,1], [1,2],
      [2,0], [2,1], [2,2],
      [3,0], [3,1], [3,2]];

// define these states from counterbalance / 12 states
var choice_state_idx = 1;//both_idx_vec[cond_idx][0];
var outcome_state_idx = 1; //both_idx_vec[cond_idx][1];

var pos_outcome_assigments = [[0, 1, 2], // Scissors is safe
                          [2, 0, 1], // House is safe / keep this for this run...
                          [1, 2, 0]]; // Girl is safe


var pos_choice_assignments = [[0,1,2,3],
                          [3,0,1,2],
                          [2,3,0,1],
                          [1,2,3,0]];

var choice_idx_vec = pos_choice_assignments[choice_state_idx]
var outcome_idx_vec = pos_outcome_assigments[outcome_state_idx];

var pos_outcome_names = ["GIRL", "HOUSE", "SCISSORS"];
var pos_choice_names = ["HAND", "PEPPER", "BUTTERFLY", "ZEBRA"];

var pos_outcome_images = ["Stimuli/Evan_Stimuli/Girl.png",
                  "Stimuli/Evan_Stimuli/House.png",
                  "Stimuli/Evan_Stimuli/Scissors.png"];

var pos_choice_images = ["Stimuli/Evan_Stimuli/Hand.png",
                  "Stimuli/Evan_Stimuli/Pepper.png",
                  "Stimuli/Evan_Stimuli/Butterfly.png",
                  "Stimuli/Evan_Stimuli/Zebra.png"];

var choice_images = [pos_choice_images[choice_idx_vec[0]],
                      pos_choice_images[choice_idx_vec[1]],
                      pos_choice_images[choice_idx_vec[2]],
                      pos_choice_images[choice_idx_vec[3]]];


var choice_names = [pos_choice_names[choice_idx_vec[0]],
      pos_choice_names[choice_idx_vec[1]],
      pos_choice_names[choice_idx_vec[2]],
      pos_choice_names[choice_idx_vec[3]]];

var outcome_images = [pos_outcome_images[outcome_idx_vec[0]],
                      pos_outcome_images[outcome_idx_vec[1]],
                      pos_outcome_images[outcome_idx_vec[2]]];

var outcome_names = [pos_outcome_names[outcome_idx_vec[0]],
      pos_outcome_names[outcome_idx_vec[1]],
      pos_outcome_names[outcome_idx_vec[2]]];


// this is constant for all subjects (160 trials)
var all_prob_o1 = [.2, .4, .6, .8];
var all_prob_trig =  [.2, .4, .6, .8];
var all_win_safe_vals = [20, 40];
var all_loss_safe_vals = [-20, -40];
var all_win_amounts = [50, 70, 90];
var all_loss_amounts = [-50, -70, -90];


// 120 trials have equal ... /// - do each one 3 times...

jsPsych.data.addProperties({subject: subject_num, date: date, time: time});

function round5(x)
{
    return Math.ceil(x/5)*5;
}
