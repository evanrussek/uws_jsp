var define_parameters = function(exp_stage){


  var parentDiv = document.body;

  //if (exp_stage == 'trial'){
    var w = parentDiv.clientWidth;
    var h = parentDiv.clientHeight;
  //} else if(exp_stage == 'instruction'){
  //  var w = parentDiv.clientWidth/2;
  //  var h = parentDiv.clientHeight/2;
  //}


  // fixation
  var fixation_font_size = h/10;
  var fixation_x = w/2;
  var fixation_y = h/2;
  var fixation_color = "white";

  // background color
  var svg_color = d3.rgb(150, 150, 150);
  var background_width = 2*w/4;
  var background_height = 3*h/4;
  var stg_bkg_x = w/2 - background_width/2;
  var stg_bkg_y = h/2 - background_height/2;

  var good_color_vec = ["#202030", "#5D556A", "#635C51", "#B0A990"];


  var img_bkg_width = background_width/2;
  var img_bkg_height = 2*background_height/7;

  var img_bkg_width2 = 9*background_width/20;
  var img_bkg_height2 = 2*background_height/7;

  var info_bkg_color = good_color_vec[0];
  var image_width = background_height/5;
  var image_height = background_height/5;
  var image_x = w/2 - img_bkg_width/4 - image_width/2;
  var image_y_vec =  [h/2 - image_height/2 - background_height/3,
                      h/2 - image_height/2,
                      h/2 - image_height/2 + background_height/3];



  //var outcome_images = [o1_image, o2_image, safe_image];
  //var outcome_vals = [o1_val, o2_val, safe_val];

  //var myInds = [0,1,2];
  //var shuffledInds = jsPsych.randomization.repeat(myInds, 1);


  var img_bkg_color =  good_color_vec[2];

  var img_bkg_x = w/2 - img_bkg_width/2;


  var image_y2_vec =  [h/2 - image_height/2 - .85*image_height,
                        h/2 - image_height/2 + .85*image_height,
                        h/2 - image_height/2];

  var img_bkg_y_vec = [image_y_vec[0] + image_height/2 - img_bkg_height/2,
                      image_y_vec[1] + image_height/2 - img_bkg_height/2,
                      image_y_vec[2] + image_height/2 - img_bkg_height/2];

  var img_bkg_y2_vec = [image_y2_vec[0] + image_height/2 - img_bkg_height/2,
                                          image_y2_vec[1] + image_height/2 - img_bkg_height/2,
                                          image_y2_vec[2] + image_height/2 - img_bkg_height/2];


  var img_bkg_width2 = 9*background_width/20;
  var img_bkg_height2 = 2*background_height/7;

  var img_bkg_x2_vec = [stg_bkg_x + background_width/40,
                        stg_bkg_x + background_width/40,
                        stg_bkg_x + 39*background_width/40 - img_bkg_width2];

  var image_x2_vec = [img_bkg_x2_vec[0] + img_bkg_width2/4 - image_width/2,
                            img_bkg_x2_vec[1]+ img_bkg_width2/4- image_width/2,
                            img_bkg_x2_vec[2]+ img_bkg_width2/4 - image_width/2];


  var text_color = "yellow";
  var text_x = w/2 + image_width/2;
  var text_font_size = 2*image_height/5;
  var text_y_vec = [image_y_vec[0] + image_height/2 + text_font_size/2,
                    image_y_vec[1] + image_height/2 + text_font_size/2,
                    image_y_vec[2] + image_height/2 + text_font_size/2];


  var text_y2_vec = [image_y2_vec[0] + image_height/2 + text_font_size/2,
                                      image_y2_vec[1] + image_height/2 + text_font_size/2,
                                      image_y2_vec[2] + image_height/2 + text_font_size/2];

  var text_x2_vec = [img_bkg_x2_vec[0] + 3*img_bkg_width2/4 - text_font_size/4,
                            img_bkg_x2_vec[1]+ 3*img_bkg_width2/4- text_font_size/4,
                            img_bkg_x2_vec[2]+ 3*img_bkg_width2/4 - text_font_size/4];

  var slow_reply_x = w/2;
  var slow_reply_y = h/2;
  var slow_reply_font_size = 1.4*text_font_size;
  var slow_reply_color = "red";

  var accept_color = "red";
  var reject_color = "blue";

  var choice_bkg_color =  good_color_vec[3];

  var choice_stim_bkg_color = good_color_vec[1];
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




  var ver1 = {

    w: w,
    h: h,

    // fixation
    fixation_font_size: fixation_font_size,
    fixation_x: fixation_x,
    fixation_y: fixation_y,
    fixation_color: fixation_color,

    // background color
    svg_color: svg_color
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
