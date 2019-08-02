var define_parameters = function(exp_stage){


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
