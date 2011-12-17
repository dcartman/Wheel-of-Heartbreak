/**
 * Let's turn the Wheel into an object that holds Slices
 */

/**
 * Start with the constructor
 */
function Wheel(wheel, slices) {
	var me = this;
	
	this.element = wheel;
	this.element.object = this;
	this.slices = [];

	this.degreesPerSlice = 360/(slices.length);
	this.svgNS = "http://www.w3.org/2000/svg";
	this.xlinkNS = "http://www.w3.org/1999/xlink";

	this.wheelCenterX = 500 ; 
	this.wheelCenterY = 450 ; 
	this.wheelRadiusX = 300 ;
	this.wheelRadiusY = 300 ;

	slices.forEach(function(slice, index, a) {
		me.createSlice(slice, index);
	});
	this.createAnimationNode();
}

Wheel.prototype.createSlice = function(slice, index) {
	var newSlice = document.createElementNS(this.svgNS, "path"),
		sliceX1 = this.wheelCenterX + this.wheelRadiusX * Math.sin( index * this.degreesPerSlice * Math.PI / 180),
    	sliceY1 = this.wheelCenterY + this.wheelRadiusY * Math.cos( index * this.degreesPerSlice * Math.PI / 180 ),
    	sliceX2 = this.wheelCenterX + this.wheelRadiusX * Math.sin( (index + 1) * this.degreesPerSlice * Math.PI / 180 ),
    	sliceY2 = this.wheelCenterY + this.wheelRadiusY * Math.cos( (index + 1) * this.degreesPerSlice * Math.PI / 180 ),
    	pathData = "M" + this.wheelCenterX + "," + this.wheelCenterY + " " + 
                   "L" + sliceX1 + "," + sliceY1 + " " + 
                   "A" + this.wheelRadiusX + "," + this.wheelRadiusY + " " +
                   "0 0,0 " +
                   sliceX2 + "," + sliceY2 + "z",
		// set the slice name
		newSliceName = document.createElementNS(this.svgNS, "text"),
		sliceXMiddle = this.wheelCenterX + this.wheelRadiusX * Math.sin( (index * this.degreesPerSlice + this.degreesPerSlice / 2) * Math.PI / 180),
    	sliceYMiddle = this.wheelCenterY + this.wheelRadiusY * Math.cos( (index * this.degreesPerSlice + this.degreesPerSlice / 2) * Math.PI / 180),
		sliceStyle = "font-family: 'ChesterfieldRegular'; font-size: 42; letter-spacing: -.4em; writing-mode: tb; glyph-orientation-vertical: 0;"
		// text node for slice
		newSliceTextNode = document.createTextNode(slice.name);

	if (slice.name == "EVERYBODY") sliceStyle = sliceStyle + " fill: white;" ;
 
    newSlice.setAttributeNS(null, "d", pathData) ;
    newSlice.setAttributeNS(null, "style", "fill: " + slice.color) ;
    newSlice.setAttributeNS(null, "fill-opacity", 1) ;
    newSlice.setAttributeNS(null, "stroke", "black") ;
    newSlice.setAttributeNS(null, "stroke-width", 4) ;

    newSliceName.setAttributeNS(null, "x", sliceXMiddle) ;
    newSliceName.setAttributeNS(null, "y", sliceYMiddle) ;
    newSliceName.setAttributeNS(null, "transform", "rotate(" + (180 - this.degreesPerSlice / 2 - index * this.degreesPerSlice ) + "," + sliceXMiddle + "," + sliceYMiddle + ")") ;
	newSliceName.setAttributeNS(null, "style", sliceStyle) ;	
    
	newSliceName.appendChild(newSliceTextNode);
    
	this.element.appendChild(newSlice);
	this.element.appendChild(newSliceName) ;
}

Wheel.prototype.createAnimationNode = function() {
	var animationNode = document.createElementNS(this.svgNS, "animateTransform") ;
	
	animationNode.setAttributeNS(null, "type", "rotate") ;
	animationNode.setAttributeNS(null, "attributeName", "transform") ;
	animationNode.setAttributeNS(null, "values", "0 " + this.wheelCenterX + " " + this.wheelCenterY + ";" + "360 " + this.wheelCenterX + " " + this.wheelCenterY) ;
	animationNode.setAttributeNS(null, "repeatCount", "indefinite") ;
	animationNode.setAttributeNS(null, "dur", "5s") ;
  
	this.element.appendChild(animationNode) ;
}