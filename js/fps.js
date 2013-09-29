/**
 * Class FPS
 *
 * @param int MAXX
 * @param string COULEUR
 */
function Fps(MAXX,COULEUR){
	this.maxX = MAXX,
	this.couleur = COULEUR,
	this.lastUpdate = (new Date)*1 - 1,
	this.fpsFilter = 50,
	this.fps = 0
};

Fps.prototype.update = function(){
	var thisFrameFPS = 1000 / ((now=new Date) - this.lastUpdate);
	this.fps += (thisFrameFPS - this.fps) / this.fpsFilter;
	this.lastUpdate = now;
};

/**
 * @param object context
 */
Fps.prototype.render= function(context){
	this.update();	
	context.fillStyle = this.couleur;
	context.font = "12px Helvetica";
	context.fillText(Math.round(this.fps*100)/100, this.maxX-40, 15);
};