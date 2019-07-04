var define_parameters = function(exp_stage){

  var pre_trial_time = 2000; // this is the ITI
  var info_fadein_time = 0;
  var info_time = 3000;
  var info_fadeout_time = 300;
  var post_info_time = 1000;
  var choice_fadein_time = 0;
  var max_response_time = 400000;
  var choice_fadeout_time = 300;
  var post_choice_time = 1000; // what is this??
  var outcome_fadein_time = 100;
  var outcome_time = 1500;
  var outcome_fadeout_time = 300;
  var slow_reply_time = 1000;

  var choice_side_fade_time = 100;
  //var post_response_static_time = 200;

  var accept_key = 'c';
  var reject_key = 'r';

  var parentDiv = document.body;

  if (exp_stage == 'trial'){
    var w = parentDiv.clientWidth;
    var h = parentDiv.clientHeight;
  } else if(exp_stage == 'instruction'){
    var w = parentDiv.clientWidth/2;
    var h = parentDiv.clientHeight/2;
  }


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

  //var outcome_images = [o1_image, o2_image, safe_image];
  //var outcome_vals = [o1_val, o2_val, safe_val];

  //var myInds = [0,1,2];
  //var shuffledInds = jsPsych.randomization.repeat(myInds, 1);

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

  var stg_bkg_x = w/2 - background_width/2;
  var stg_bkg_y = h/2 - background_height/2;

  // instruction page 2 parametesr


  var ver1 = {

    pre_trial_time: pre_trial_time,
    info_fadein_time: info_fadein_time,
    info_time: info_time,
    info_fadeout_time: info_fadeout_time,
    post_info_time: post_info_time,
    choice_fadein_time: choice_fadein_time,
    max_response_time: max_response_time,
    choice_fadeout_time: choice_fadeout_time,
    post_choice_time: post_choice_time, // what is this??
    outcome_fadein_time: outcome_fadein_time,
    outcome_time: outcome_time,
    outcome_fadeout_time: outcome_fadeout_time,
    slow_reply_time: slow_reply_time,
    //var post_response_static_time: 200,
    choice_side_fade_time: choice_side_fade_time,

    accept_key: accept_key,
    reject_key: reject_key,

    w: w,
    h: h,

    // fixation
    fixation_font_size: fixation_font_size,
    fixation_x: fixation_x,
    fixation_y: fixation_y,
    fixation_color: fixation_color,

    // background color
    svg_color: svg_color,
    background_width: background_width,
    background_height: background_height,
    good_color_vec: good_color_vec,


    info_bkg_color: info_bkg_color,
    image_width: image_width,
    image_height: image_height,
    image_x: image_x,
    image_y_vec: image_y_vec,

    //outcome_images: outcome_images,
    //outcome_vals: outcome_vals,

    stg_bkg_x: stg_bkg_x,
    stg_bkg_y: stg_bkg_y,

    //shuffledInds: shuffledInds,

    img_bkg_width: img_bkg_width,
    img_bkg_height: img_bkg_height,

    img_bkg_color:  img_bkg_color,

    img_bkg_x: img_bkg_x,
    img_bkg_y_vec: img_bkg_y_vec,


    text_color: text_color,
    text_x: text_x,
    text_font_size: text_font_size,
    text_y_vec: text_y_vec,

    slow_reply_x: slow_reply_x,
    slow_reply_y: slow_reply_y,
    slow_reply_font_size: slow_reply_font_size,
    slow_reply_color: slow_reply_color,

    accept_color: accept_color,
    reject_color: reject_color,

    choice_bkg_color:  choice_bkg_color,

    choice_stim_bkg_color: choice_stim_bkg_color,
    choice_stim_bkg_height: choice_stim_bkg_height,
    choice_stim_bkg_width: choice_stim_bkg_width,
    choice_stim_bkg_x: choice_stim_bkg_x,
    choice_stim_bkg_y: choice_stim_bkg_y,

    choice_stim_height: choice_stim_height,
    choice_stim_width: choice_stim_width,
    choice_stim_x: choice_stim_x,
    choice_stim_y: choice_stim_y,

    outcome_img_bkg_height: outcome_img_bkg_height,
    outcome_img_bkg_width: outcome_img_bkg_width,
    outcome_img_bkg_x:outcome_img_bkg_x,
    outcome_img_bkg_y: outcome_img_bkg_y,

    outcome_img_height: outcome_img_height,
    outcome_img_width: outcome_img_width,
    outcome_img_x: outcome_img_x,
    outcome_img_y: outcome_img_y,

    outcome_text_x: outcome_text_x,
    outcome_text_y: outcome_text_y,
    outcome_text_font_size: outcome_text_font_size,
  }
  return ver1
}


/// functions for placing things, should move these at some point
var place_img_bkg = function(class_name,x,y,width,height,color, opacity){
  d3.select("svg").append("rect")
          .attr("class",class_name)
          .attr("x", x)
          .attr("y", y)
          .attr("width", width)
          .attr("height", height)
          .style("fill", color)
          .style("opacity",opacity);
}

var place_img = function(im_name, class_name, x, y, width, height, opacity){
  d3.select("svg").append("svg:image").attr("class", class_name).attr("x", x)
      .attr("y", y).attr("width",width).attr("height",height)
      .attr("xlink:href", im_name).style("opacity",opacity);
}

var place_reward = function(magnitude, class_name, x, y, font_size, opacity){
   d3.select("svg").append("text")
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
var place_text = function(text, class_name, x, y, font_size, opacity, color){
   d3.select("svg").append("text")
             .attr("class", class_name)
             .attr("x",  x)
             .attr("y", y)
             .attr("font-family","monospace")
             .attr("font-weight","bold")
             .attr("font-size",font_size)
             .attr("text-anchor","middle")
             .attr("fill", color)
             .style("opacity",opacity)
             .text(text)
}
