/*
 * Example plugin template
 */

jsPsych.plugins["evan-run-trial"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "evan-run-trial",
    parameters: {

      first_stage:{
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      last_stage:{
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      allow_reject:{
        type: jsPsych.plugins.parameterType.BOOL,
        default: true
      },
      show_money_val:{
        type: jsPsych.plugins.parameterType.BOOL,
        default: undefined
      },
      safe_val: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      o1_val: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      o2_val: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      p_o1: {
        type: jsPsych.plugins.parameterType.FLOAT,
        default: undefined
      },
      o1_image: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      o2_image: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      safe_image: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      choice_image: {
        type: jsPsych.plugins.parameterType.FLOAT,
        default: undefined
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    d3.select(".jspsych-content-wrapper").remove();

    ///// set all timing parameters (in milliseconds)
    var pre_trial_time = 1500;
    var info_fadein_time = 100;
    var info_time = 2000;
    var info_fadeout_time = 100;
    var post_info_time = 1000;
    var chocie_fadein_time = 100;
    var choice_time = 4000;
    var choice_fadeout_time = 100;
    var post_choice_time = 1000;
    var outcome_fadein_time = 100;
    var outcome_time = 2000;
    var max_response_time = 400000;
    var slow_reply_time = 1000;
    var post_response_static_time = 200;

    var accept_key = 'c';
    var reject_key = 'r';


    var parentDiv = document.body;
    var w = parentDiv.clientWidth;
    var h = parentDiv.clientHeight;

    // fixation
    var fixation_font_size = h/10;
    var fixation_x = w/2;
    var fixation_y = h/2;
    var fixation_color = "white";


    // background color
    var svg_color = d3.rgb(150, 150, 150);
    var background_width = 2*w/4;
    var background_height = 3*h/4;
    var good_color_vec = ["#202030", "#5D556A", "#635C51", "#B0A990"];


    var info_bkg_color = good_color_vec[0];
    var image_width = background_height/5;
    var image_height = background_height/5;
    var image_x = w/2 - image_width;
    var image_y_vec =  [h/2 - image_height/2 - background_height/3,
                        h/2 - image_height/2,
                        h/2 - image_height/2 + background_height/3];

    var outcome_images = [trial.o1_image, trial.o2_image, trial.safe_image];
    var outcome_vals = [trial.o1_val, trial.o2_val, trial.safe_val];

    var myInds = [0,1,2];
    var shuffledInds = jsPsych.randomization.repeat(myInds, 1);

    var img_bkg_width = background_width/2;
    var img_bkg_height = 2*background_height/7;

    var img_bkg_color =  good_color_vec[2];

    var img_bkg_x = w/2 - background_width/2 + background_width/4;
    var img_bkg_y_vec = [image_y_vec[0] + image_height/2 - img_bkg_height/2,
                        image_y_vec[1] + image_height/2 - img_bkg_height/2,
                        image_y_vec[2] + image_height/2 - img_bkg_height/2];


    var text_color = "yellow";
    var text_x = w/2 + image_width/2;
    var text_font_size = 2*image_height/5;
    var text_y_vec = [image_y_vec[0] + image_height/2 + text_font_size/2,
                      image_y_vec[1] + image_height/2 + text_font_size/2,
                      image_y_vec[2] + image_height/2 + text_font_size/2];

    var slow_reply_x = w/2;
    var slow_reply_y = h/2;
    var slow_reply_font_size = 1.4*text_font_size;
    var slow_reply_color = "red";

    var accept_color = "red";
    var reject_color = "blue";

    var choice_bkg_color =  good_color_vec[3];

    var choice_stim_bkg_color = good_color_vec[2];
    var choice_stim_bkg_height = 2*background_width / 3;
    var choice_stim_bkg_width = 2*background_width / 3;
    var choice_stim_bkg_x = w/2 - choice_stim_bkg_width/2;
    var choice_stim_bkg_y = h/2 - choice_stim_bkg_height/2;

    var choice_stim_height = 2*choice_stim_bkg_height / 3;
    var choice_stim_width = 2*choice_stim_bkg_width / 3;
    var choice_stim_x = w/2 - choice_stim_width/2;
    var choice_stim_y = h/2 - choice_stim_height/2;

    var outcome_img_bkg_height = img_bkg_height;
    var outcome_img_bkg_width = img_bkg_width;
    var outcome_img_bkg_x = w/2 - outcome_img_bkg_width/2;
    var outcome_img_bkg_y = h/2 - outcome_img_bkg_height/2;

    var outcome_img_height = image_height;
    var outcome_img_width = image_width;
    var outcome_img_x = image_x;
    var outcome_img_y = h/2 - outcome_img_width/2;

    var outcome_text_x = text_x;
    var outcome_text_y = text_y_vec[1];
    var outcome_text_font_size = text_font_size;

    //// generally useful helper functions
    var wait_for_time = function(n_msec, next_fun){
      // wait n_msec and then call next function
      jsPsych.pluginAPI.setTimeout(function() {
          next_fun() //
        }, n_msec);
    } // end wait for time

    // functions to assist with callbacks after multiple transitions are run
    var setupMT = function(sel){
      counter = sel.size(); // set a function
      console.log('counter_start:' + counter)
    }
    var onMT = function(next_fun){
      counter--;
      if(counter == 0){ next_fun(); }
    }

    var this_MT = function(){
       return onMT(this_next_fun);
     }

    // create svg - stimulus background // need to define this here so other funcs can use it
    var svg = d3.select(parentDiv)
            .append("svg")
            .attr("width", w)
            .attr("height", h)

    // place grey background on it
    svg.append("rect")
          .attr("x", 0).attr("y", 0).attr("width", w)
          .attr("height", h).style("fill", svg_color).style("opacity",.7);

    //// functions for placing stimuli
    var place_stg_bkg = function(class_name,color,opacity) {
        // place stage background
        // only thing that changes here is the class_name and the color
          svg.append("rect")
              .attr("class", class_name)
              .attr("x", w/2 - background_width/2)
              .attr("y", h/2 - background_height/2)
              .attr("width", background_width)
              .attr("height", background_height)
              .style("fill", color)
              .style("opacity",opacity);
      };

    var place_img_bkg = function(class_name,x,y,width,height,color, opacity){
      svg.append("rect")
              .attr("class",class_name)
              .attr("x", x)
              .attr("y", y)
              .attr("width", width)
              .attr("height", height)
              .style("fill", color)
              .style("opacity",opacity);
    }

    var place_fixation = function(){
      d3.select('svg').append("text")
                .attr("class", "my_fix")
                .attr("x",  fixation_x)
                .attr("y", fixation_y)
                .attr("font-family","monospace")
                .attr("font-weight","bold")
                .attr("dominant-baseline", "central")
                .attr("font-size",fixation_font_size)
                .attr("text-anchor","middle")
                .attr("fill", fixation_color)
                .style("opacity",1)
                .text('+')
      }

    var place_img = function(im_name, class_name, x, y, width, height, opacity){
      svg.append("svg:image").attr("class", class_name).attr("x", x)
          .attr("y", y).attr("width",width).attr("height",height)
          .attr("xlink:href", im_name).style("opacity",opacity);
    }

    var place_reward = function(magnitude, class_name, x, y, font_size, opacity){
       svg.append("text")
                 .attr("class", class_name)
                 .attr("x",  x)
                 .attr("y", y)
                 .attr("font-family","monospace")
                 .attr("font-weight","bold")
                 .attr("font-size",font_size)
                 .attr("text-anchor","middle")
                 .attr("fill", "yellow")
                 .style("opacity",opacity)
                 .text(magnitude)
    }

    var place_outcomes = function(opacity){
      // put up the accept outcome 1  (just 1 for now)outcome_img_height
      place_img_bkg("ob",outcome_img_bkg_x,outcome_img_bkg_y,outcome_img_bkg_width,outcome_img_bkg_height,img_bkg_color,opacity);
      place_img(trial.o1_image, "o1", outcome_img_x, outcome_img_y, outcome_img_width, outcome_img_height,opacity);
      if (trial.show_money_val){place_reward(trial.o1_val, "o1", outcome_text_x, outcome_text_y, outcome_text_font_size,opacity)};

      // accept outcome 2
      place_img(trial.o2_image, "o2", outcome_img_x, outcome_img_y, outcome_img_width, outcome_img_height,opacity);
      if (trial.show_money_val){place_reward(trial.o2_val, "o2", outcome_text_x, outcome_text_y, outcome_text_font_size,opacity)};

      // reject outcome
      place_img(trial.safe_image, "safe", outcome_img_x, outcome_img_y, outcome_img_width, outcome_img_height,opacity);
      if (trial.show_money_val){place_reward(trial.safe_val, "safe", outcome_text_x, outcome_text_y, outcome_text_font_size,opacity)};
    }

    var place_choice = function(opacity){

      // put up choice_stim too so we can fade into it
      place_stg_bkg("choice_stim choice_bkg",choice_bkg_color,opacity);
      // put up the image background
      place_img_bkg("choice_stim",choice_stim_bkg_x,choice_stim_bkg_y,
                    choice_stim_bkg_width,choice_stim_bkg_height,choice_stim_bkg_color,opacity);

      place_img(trial.choice_image, "choice_stim", choice_stim_x,
                            choice_stim_y, choice_stim_width, choice_stim_height,opacity);

    }

    var place_info = function(opacity){
      // place stage background
      place_stg_bkg("info_bkg",info_bkg_color,opacity);
      // place every image specific background and every image on top of it
      for (var i=0; i<3; i++){
        place_img_bkg("info",img_bkg_x,img_bkg_y_vec[i],img_bkg_width,img_bkg_height,img_bkg_color,opacity);
        place_img(outcome_images[shuffledInds[i]], "info", image_x, image_y_vec[i], image_width, image_height,opacity);
        place_reward(outcome_vals[shuffledInds[i]], "info", text_x, text_y_vec[i], text_font_size,opacity);
      }
    }

    var place_everything  = function(){
      place_fixation();
      place_outcomes(0);
      place_choice(0);
      place_info(0);
    }

    ////// master function which runs the whole trial
    var trial_master = function(trial_stage){
      console.log('trial_stage: ' + trial_stage)

      switch(trial_stage){
        // part 1 is stage 1
        case 1:
          // information
          stage_1_master(1);
          break;

        case 2:
          // choice
          stage_2_master(1);
          break;
        case 3:
          // feedback
          stage_3_master(1);
          break;
        case 4:
          // end trial
          console.log('end trial')
          end_trial();
          // end the trial
      }
    }

    //// function to run each stage
    var stage_1_master = function(stage_1_part){
      switch(stage_1_part){
        case 1:
          // takes x seconds - set it above how long it should take
          display_trial_info();
          break;
        case 2: // got here twice?
          wait_for_time(info_time,remove_trial_info);
          break;
        case 3:
          if (trial.last_stage < 2){var next_stage_number = 4} else{var next_stage_number = 2};
          wait_for_time(post_info_time,function(){trial_master(next_stage_number)});
        }
      }

    var stage_2_master = function(stage_2_part){
      // this is getting ca
      switch(stage_2_part){
        case 1:
          //console.log('stage_2_called')
          wait_for_time(1000, display_choice);
          break;
        case 2:
          remove_choice();
          break;
        case 3:
          if (trial.last_stage < 3){var next_stage_number = 4} else{var next_stage_number = 3};
          console.log('end of stage 2')
          trial_master(next_stage_number);
      }
    }

    var stage_3_master = function(stage_3_part){
      switch(stage_3_part){
        case 1:
          // specify how long to wait
          wait_for_time(500, display_outcome);
          break;
        case 2:
          wait_for_time(1000, remove_outcome);
          break;
        case 3:
          trial_master(4);
          break;
      }
    }


    /// specific functions called by each stage trial_master
    // stage 1 funcs
    var display_trial_info = function(stop_here){

      d3.select('.info_bkg').transition().style("opacity",.7).duration(info_fadein_time);

      d3.selectAll('.info')
        .transition()
        .style("opacity",1)
        .duration(info_fadein_time);

      if (typeof stop_here == 'undefined'){
        wait_for_time(info_fadein_time, function(){ return stage_1_master(2)});
      }
    } // end display trial info

    var remove_trial_info = function(){
      this_next_fun = function(){
         stage_1_master(3);
      }

      d3.select('.info_bkg').transition().style("opacity",0)
        .duration(info_fadeout_time);

      // remove info
      d3.selectAll('.info').call(setupMT).transition()
        .style("opacity",0).duration(info_fadeout_time)
        .on('end', this_MT);

    } // end remove trial info

    ///// stage 2 funcs
    var display_choice = function(){
      // want to add something showing that their choice was registered? - maybe change the background color?
      // display the choice and start the keyboard listeners
      d3.selectAll('.choice_stim')
        .transition()
        .style("opacity",1)
        .duration(50)


      var handle_response = function(info){

        // clear timeout counting response time
        jsPsych.pluginAPI.clearAllTimeouts();

        if (response.key == null) {
            response = info;
        }

        var choice_char = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(response.key);

        // change background color based on choice
        //if (choice_char == 'a'){d3.select('.choice_bkg').style('fill',accept_color);}
        //else if (choice_char == 'r'){d3.select('.choice_bkg').style('fill',reject_color);}

        // kill keyboard listeners
        if (typeof keyboardListener !== 'undefined') {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
        // call stage_2_master

        // want to add something showing that their choice was registered? - maybe change the background color?
        //this_next_fun = function(){stage_2_master(2);}
        //wait_for_time(post_response_static_time, this_next_fun);
        stage_2_master(2);

      }

      var handle_slow_response = function(){
        jsPsych.pluginAPI.clearAllTimeouts();
        place_reward('Please respond faster!', 'slow_reply', slow_reply_x, slow_reply_y, slow_reply_font_size, 1)
        d3.select(".slow_reply")
          .attr("fill", "red")

        wait_for_time(slow_reply_time, end_trial);
      }

      if (trial.allow_reject){
        var valid_responses = [accept_key, reject_key];
      }else{
        var valid_responses = [accept_key];
      }

      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: handle_response,
          valid_responses: valid_responses,
          rt_method: 'date',
          persist: false,
          allow_held_key: false
        });

      wait_for_time(max_response_time, handle_slow_response);
    }

    var remove_choice = function(){
      this_next_fun = function(){stage_2_master(3);}

      d3.selectAll('.choice_stim').call(setupMT).transition()
        .style("opacity",0).duration(500).on('end', this_MT)
    }

    //// stage 3 funcs
    var display_outcome = function(){
      // this will display the outcome based on the response, which is a global variable
      var choice_char = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(response.key);

      var next_state = 'safe';
      if (choice_char == 'a'){
        var choice = 'accept'; // accept
        if (Math.random() < trial.p_o1)
        {
          var next_state = 'o1';
        } else{
          var next_state = 'o2';
        }
      } else{
        var next_state = 'safe';
        var choice = 'reject';
      }
      sel_text = '.ob,.'+next_state;

      this_next_fun = function(){
         stage_3_master(2);
      }

      // display the feedback with some delay
      d3.selectAll(sel_text)
        .call(setupMT)
        .transition()
        .style("opacity",1)
        .duration(50)
        .on('end', this_MT)
    } // end display outcome

    var remove_outcome = function(){

      this_next_fun = function(){
        stage_3_master(3);
      } // end this_next_fun

      d3.selectAll(sel_text)
        .call(setupMT)
        .transition()
        .style("opacity",0)
        .duration(50)
        .on('end', this_MT)
    } // end remove outcome

  /// stage 4 - end trial, save data,
  var end_trial = function(){

    if (typeof keyboardListener !== 'undefined') {
      jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
    }
    d3.select('svg').remove()

    var trial_data = {
      "p_o1": trial.p_o1
    };

    jsPsych.finishTrial(trial_data);
  } // end end_trial


  // define the response that we'll append
  var response = {
      rt: null,
      key: null
    };


    // default trial data that we'll append
    var trial_data = {
          "p_o1": trial.p_o1
    };

    //// start the trial -  place everything
    place_everything();

    // wait pretrial time sec (ITI), call trial master
    jsPsych.pluginAPI.setTimeout(function() {
       trial_master(trial.first_stage) //
     }, pre_trial_time); // this is where the wait time goes
  };

  return plugin;
})();
