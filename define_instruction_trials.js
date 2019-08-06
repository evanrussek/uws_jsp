var safe_name = outcome_names[2];
// for two-stim choice add parameter for whether to limit choice time.
var instruction_pages_1a = ['Stimuli/Instructions_jpg/Slide1.jpg',
                            'Stimuli/Instructions_jpg/Slide2.jpg',
                            'Stimuli/Instructions_jpg/Slide3_' + safe_name + '.jpg',
                            'Stimuli/Instructions_jpg/Slide4_'+ safe_name + '.jpg',
                            'Stimuli/Instructions_jpg/Slide5.jpg'];

var instruction_pages_1b = ["Stimuli/Instructions_jpg/Slide6_" + safe_name + ".jpg"];
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
    show_clickable_nav: true,
    on_trial_start: function() { setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)}
}

var instruc1a_trials = jsPsych.randomization.repeat([build_practice_trial_stg1(1,.2,true,false), build_practice_trial_stg1(2,.4,true,false),
    build_practice_trial_stg1(3,.6,true,false), build_practice_trial_stg1(4,.8,true,false)],1);

instruc1a_trials.splice(2,0,rand_gen_info_quiz());

var instruc1b_trials = [gen_rand_choice_trial(2, 4, 1,1,false),  gen_rand_choice_trial(1, 3, 2, 1,false),
                        gen_rand_choice_trial(1, 4, 2, 0,false),  gen_rand_choice_trial(1, 3, 2, 0,false)];


// define the instruction quiz...
var options1a =  ["It is random",
            "Number of points collected on a randomly selected choice game.",
            "Number of points collected on a randomly selected choice game as well as answers to attention check questions.",
            "Just total number of points collected.",
            "Just answers to attention check questions.",
            "The total number of points collected as well as answers to attention check questions.",
            "I do not know"
        ];
var correct1a = 5;

var options2a = ["Banknotes with positive point values increase the number of points in the collection by their point value. \
                    Banknotes with negative point values do not affect your collection.",
                    "Banknotes with positive point values increase the number of points in your collection by their point value. \
                    Banknotes with negative point values decrease the number of points in your collection by their point value.",
                     "Banknotes with positive point values do not affect your collection.\
                     Banknotes with negative point values decrease the number of points in the collection by their point value.",
                     "I do not know"];
var correct2a = 1;

var options3a = ["1", "2", "3","4","5","6","7"];
var correct3a = 1;

var options4a = ["1", "2", "3","4","5","6","7"];
var correct4a = 3;

var options5a = ["Each slot machine can lead to any of the banknotes. The chances that a given slot machine provides a given banknote are different for each slot machine.",
                "Each slot machine can lead to either of the banknotes. The chances that a given slot machine provides a given banknote are the same for each slot machine.",
                "Some slot machines always provide the same banknote.",
                "I do not know"];
var correct5a = 0;

var options6a = ["Yes", "No", "I do not know."];
var correct6a = 1;

var options7a = ["The point value of a banknote is the same for each choice game.",
                 "The point value of a banknote changes on each choice game. You will not know the point value of either banknote before you make the choice.",
                 "The point value of a banknote changes on each choice game. Before the game, you will be shown the point value of each banknote.",
                 "I do now know."];
var correct7a = 2;
var corr_string = '{"Q0":' + '"'+options1a[correct1a]+'",' + '"Q1":' + '"'+options2a[correct2a]+'",'
    + '"Q2":' + '"'+options3a[correct3a]+'",' + '"Q3":' + '"'+options4a[correct4a]+'",' +
    '"Q4":' + '"'+options5a[correct5a]+'",' + '"Q5":' + '"'+options6a[correct6a]+'",'
     + '"Q6":' + '"'+options7a[correct7a]+'"' + '}';

                        /* define instruction check block */
var instructioncorrect = false;
var instruction_check = {
    type: "survey-multi-choice",
    preamble: ["<p align='center'><b>Please answer every question. Answering 'I do not know' or answering incorrectly will require you return to the beginning of the instructions. </b></p>"],
    questions: [
        {prompt: "<b>Question 1</b>: What determines the bonus for this task?",
                options: options1a, required: true},
        {prompt: "<b>Question 2</b>: How does collecting a banknote affect your collected total number of points?",
                    options: options2a, required: true},
        {prompt: "<b>Question 3</b>: How many banknotes are in this task?",
                    options: options3a, required: true},
        {prompt: "<b>Question 4</b>: How many slot machines are in this task?",
                        options: options4a, required: true},
        {prompt: "<b>Question 5</b>: How do different slot machines produce different banknotes?",
                        options: options5a, required: true},
        {prompt: "<b>Question 6</b>: Do the chances that a given slot machine will produce a certain banknote change over the course of the task?",
                    options: options6a, required: true},
        {prompt: "<b>Question 7</b>: What determines the point value of a banknote on a choice game?",
                                options: options7a, required: true}
                ],
        on_finish: function(data) {
            console.log(data.responses)
            console.log(corr_string)
            if( data.responses == corr_string) {
                action = false;
                instructioncorrect = true;
            }
        }
    }
    //introloop.push(instruction_check)

/* define a page for the incorrect response */
var showsplash = true;
var splash_screen = {
	type: 'html-button-response',
    timing_post_trial: 0,
	//    button_html: '<button class="jspsych-btn" style="display:none">%choice%</button>',
    choices: ['Click here to read the instructions again'],
    is_html: true,
    stimulus: 'At least one of your answers was either incorrect or you answered "I do not know".'
}

/* ...but push it to a conditional node that only shows it if the response was wrong */
var conditional_splash1 = {
  timeline: [splash_screen],
  conditional_function: function(data) {
	return !instructioncorrect // skip if correct
  }
}

var conditional_splash1 = {
  timeline: [splash_screen],
  conditional_function: function(data) {
	return !instructioncorrect // skip if correct
  }
}


var intro_w_trials = [];
intro_w_trials.push(instruction_pages1a);
intro_w_trials = intro_w_trials.concat(instruc1a_trials);
intro_w_trials.push(instruction_pages1b);
intro_w_trials = intro_w_trials.concat(instruc1b_trials);
intro_w_trials.push(instruction_pages1c);
intro_w_trials.push(instruction_check);
intro_w_trials.push(conditional_splash1);


var introloop = [];
introloop.push(instruction_pages1a);
introloop.push(instruction_pages1b);
introloop.push(instruction_pages1c);
introloop.push(instruction_check);
introloop.push(conditional_splash1);
/* finally, add the entirety of this introductory section to a loop node ... */
var loop_node = {
  timeline: introloop,
  conditional_function: function(data) {
  	return !instructioncorrect // skip if correct
},
  loop_function: function(data) {
	var action = true;
	return !instructioncorrect // stop looping if correct
	}
}
intro_w_trials.push(loop_node);
var instruc_timeline = intro_w_trials;
