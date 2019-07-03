
jsPsych.plugins["evan-two-stim-choice"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "evan-two-stim-choice",
    parameters: {
      first_stage:{
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
      p_o1_c1: {
        type: jsPsych.plugins.parameterType.FLOAT,
        default: undefined
      },
      p_o1_c2: {
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
      c1_image: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      c2_image: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
    }
  }
}

  plugin.trial = function(display_element, trial) {

    par = define_parameters('trial');
    par.outcome_images= [trial.o1_image, trial.o2_image];

    ///// set all timing parameters (in milliseconds)
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
    var svg = d3.select(".jspsych-content-wrapper")
                .append("svg")
                .attr("width", par.w)
                .attr("height", par.h)


    // place grey background on it
    d3.select("svg").append("rect")
          .attr("x", 0).attr("y", 0).attr("width", par.w)
          .attr("height", par.h).style("fill", par.svg_color).style("opacity",.7);


    //// functions for placing stimuli (copied and pasted for now)
    var place_stg_bkg = function(class_name,color,opacity) {
        // place stage background
        // only thing that changes here is the class_name and the color
          d3.select("svg").append("rect")
              .attr("class", class_name)
              .attr("x", par.w/2 - par.background_width/2)
              .attr("y", par.h/2 - par.background_height/2)
              .attr("width", par.background_width)
              .attr("height", par.background_height)
              .style("fill", color)
              .style("opacity",opacity);
      };

      var place_fixation = function(){
        d3.select('svg').append("text")
                  .attr("class", "my_fix")
                  .attr("x",  par.fixation_x)
                  .attr("y", par.fixation_y)
                  .attr("font-family","monospace")
                  .attr("font-weight","bold")
                  .attr("dominant-baseline", "central")
                  .attr("font-size",par.fixation_font_size)
                  .attr("text-anchor","middle")
                  .attr("fill", par.fixation_color)
                  .style("opacity",1)
                  .text('+')
        }


    var place_info = function(opacity){
      // place stage background
      place_stg_bkg("info_bkg",par.info_bkg_color,opacity);
      // place every image specific background and every image on top of it
      for (var i=0; i<2; i++){
        place_img_bkg("info",par.img_bkg_x,par.img_bkg_y_vec[i],par.img_bkg_width,par.img_bkg_height,par.img_bkg_color,opacity);
        place_img(par.outcome_images[par.shuffledInds[i]], "info", par.image_x, par.image_y_vec[i], par.image_width, par.image_height,opacity);
        place_reward(par.outcome_vals[par.shuffledInds[i]], "info", par.text_x, par.text_y_vec[i], par.text_font_size,opacity);
      }
    }

    place_info(1)

    // data saving
    var trial_data = {
      parameter_name: 'parameter value'
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
