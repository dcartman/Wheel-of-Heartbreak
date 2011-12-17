var svgNS = "http://www.w3.org/2000/svg";
var xlinkNS = "http://www.w3.org/1999/xlink";

var wheelCenterX = 500 ; 
var wheelCenterY = 450 ; 
var wheelRadiusX = 300 ;
var wheelRadiusY = 300 ;

var losers = [["WILL", "red"],
["EVERYBODY"],
["DAVE D", "yellow"],
["ERIC", "green"],
["DAVE P", "blue"],
["DAN K", "purple"],
["EVERYBODY"],
["KEN", "aqua"],
["JACOB", "magenta"]] ;

function createWheel() {
  createSlices() ;
  createAnimationNode() ;
}

function createSlices() {
  var degreesPerSlice = 360/(losers.length) ;

  for (i=0; i<losers.length; i++) {
    var newSlice = document.createElementNS(svgNS, "path") ;

    var sliceX1 = wheelCenterX + wheelRadiusX*Math.sin(i*degreesPerSlice*Math.PI/180) ;
    var sliceY1 = wheelCenterY + wheelRadiusY*Math.cos(i*degreesPerSlice*Math.PI/180) ;
    var sliceX2 = wheelCenterX + wheelRadiusX*Math.sin((i+1)*degreesPerSlice*Math.PI/180) ;
    var sliceY2 = wheelCenterY + wheelRadiusY*Math.cos((i+1)*degreesPerSlice*Math.PI/180) ;
    var pathData = "M" + wheelCenterX + "," + wheelCenterY + " " + 
                   "L" + sliceX1 + "," + sliceY1 + " " + 
                   "A" + wheelRadiusX + "," + wheelRadiusY + " " +
                   "0 0,0 " +
                   sliceX2 + "," + sliceY2 + "z" ;
 
    newSlice.setAttributeNS(null, "d", pathData) ;
    newSlice.setAttributeNS(null, "style", "fill: " + losers[i][1]) ;
    newSlice.setAttributeNS(null, "fill-opacity", 1) ;
    newSlice.setAttributeNS(null, "stroke", "black") ;
    newSlice.setAttributeNS(null, "stroke-width", 4) ;
    document.getElementById("wheel").appendChild(newSlice) ;
    
    var newSliceName = document.createElementNS(svgNS, "text") ;

    var sliceXMiddle = wheelCenterX + wheelRadiusX*Math.sin((i*degreesPerSlice+degreesPerSlice/2)*Math.PI/180) ;
    var sliceYMiddle = wheelCenterY + wheelRadiusY*Math.cos((i*degreesPerSlice+degreesPerSlice/2)*Math.PI/180) ;

    newSliceName.setAttributeNS(null, "x", sliceXMiddle) ;
    newSliceName.setAttributeNS(null, "y", sliceYMiddle) ;
    newSliceName.setAttributeNS(null, "transform", "rotate(" + (180-degreesPerSlice/2-i*degreesPerSlice) + "," + sliceXMiddle + "," + sliceYMiddle + ")") ;
    var sliceStyle = "font-family: 'ChesterfieldRegular'; font-size: 42; letter-spacing: -.4em; writing-mode: tb; glyph-orientation-vertical: 0;" ;
    if (losers[i][0] == "EVERYBODY")
      sliceStyle = sliceStyle + " fill: white;" ;
    newSliceName.setAttributeNS(null, "style", sliceStyle) ;
    var newSliceTextNode = document.createTextNode(losers[i][0]);
    newSliceName.appendChild(newSliceTextNode);
    document.getElementById("wheel").appendChild(newSliceName) ;
  }
}

function createAnimationNode() {
  var animationNode = document.createElementNS(svgNS, "animateTransform") ;
  animationNode.setAttributeNS(null, "type", "rotate") ;
  animationNode.setAttributeNS(null, "attributeName", "transform") ;
  animationNode.setAttributeNS(null, "values", "0 " + wheelCenterX + " " + wheelCenterY + ";" + "360 " + wheelCenterX + " " + wheelCenterY) ;
  animationNode.setAttributeNS(null, "repeatCount", "indefinite") ;
  animationNode.setAttributeNS(null, "dur", "5s") ;
  document.getElementById("wheel").appendChild(animationNode) ;
}
