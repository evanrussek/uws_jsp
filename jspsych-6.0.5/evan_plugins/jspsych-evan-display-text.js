/*
 * Example plugin template
 */

jsPsych.plugins["evan-display-text"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "evan-display-text",
    parameters: {
      line_1: {
        type: jsPsych.plugins.parameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: ''
      },
      line_2: {
        type: jsPsych.plugins.parameterType.STRING,
        default: ''
    },
    line_3: {
      type: jsPsych.plugins.parameterType.STRING,
      default: ''
    }
}}

  plugin.trial = function(display_element, trial) {

    var wait_for_time = function(n_msec, next_fun){
      // wait n_msec and then call next function
      jsPsych.pluginAPI.setTimeout(function() {
          next_fun() //
        }, n_msec);
    } // end wait for time


    // get params
    var par = define_parameters('trial');

    var svg = d3.select(".jspsych-content-wrapper")
                .append("svg")
                .attr("width", par.w)
                .attr("height", par.h)

    // place grey background on it
    d3.select("svg").append("rect")
          .attr("x", 0).attr("y", 0).attr("width", par.w)
          .attr("height", par.h).style("fill", par.svg_color).style("opacity",.7);

    place_text(trial.line_1, 'text', par.w/2, par.h/2 - par.text_font_size, par.text_font_size/2, 1, "White");
    place_text(trial.line_2, 'text', par.w/2, par.h/2, par.text_font_size/2, 1, "White");
    place_text(trial.line_3, 'text', par.w/2, par.h/2 + par.text_font_size, par.text_font_size/2, 1, "White");


    ///////////////////////////////////////


    // put up the svg

    // data saving
    var trial_data = {
      // add time to this...
      line_1: trial.line1,
      line_2: trial.line2,
      line_3: trial.line3
    };

    wait_for_time(par.text_info_prac_time,function(){ d3.select('svg').remove(); jsPsych.finishTrial(trial_data);});


  };

  return plugin;
})();
