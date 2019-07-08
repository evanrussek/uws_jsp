/*
 * Example plugin template
 */


// plugin to show either a photo, or a piece of text and ask which reward it was just paired with...
jsPsych.plugins["evan-info-quiz"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "evan-info-quiz",
    parameters: {
      outcome_image:{
        type: jsPsych.plugins.parameterType.IMAGE, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      outcome_name: {
        type: jsPsych.plugins.parameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: undefined
      },
      outcome_val: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      other_vals: { // try this for a list...
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    par = define_parameters('trial')
    // place the svg.
    // create svg - stimulus background // need to define this here so other funcs can use it
    var svg = d3.select(".jspsych-content-wrapper")
                .append("svg")
                .attr("width", par.w)
                .attr("height", par.h)


    // place grey background on it
    d3.select("svg").append("rect")
          .attr("x", 0).attr("y", 0).attr("width", par.w)
          .attr("height", par.h).style("fill", par.svg_color).style("opacity",.7);
    ////////////////////////////////////////
    var q_text_y = h/5;
    var q_text_x = par.w/2;

    if (typeof trial.outcome_image == 'undefined'){
      var txt_q = 'How many points is ' + trial.outcome_name + ' worth?';
      place_text(txt_q, 'Prompt', q_text_x, y, font_size, 1, "Black");
    };



    // data saving
    var trial_data = {
      parameter_name: 'parameter value'
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
