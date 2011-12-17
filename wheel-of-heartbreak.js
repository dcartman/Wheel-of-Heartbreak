
var losers = [
	{"name":"WILL", "color":"red"},
	{"name":"EVERYBODY", "color":"black"},
	{"name":"DAVE D", "color":"yellow"},
	{"name":"ERIC", "color":"green"},
	{"name":"DAVE P", "color":"blue"},
	{"name":"DAN K", "color":"purple"},
	{"name":"EVERYBODY", "color":"black"},
	{"name":"KEN", "color":"aqua"},
	{"name":"JACOB", "color":"magenta"}
];

function createWheel() {
  // createSlices() ;
  // createAnimationNode() ;
	wheel = new Wheel(document.getElementById("wheel"), losers);
}
