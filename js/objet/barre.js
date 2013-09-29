/**
 * Class Barre
 *
 * @param int BARREX
 * @param int BARREY
 * @param int BARRE_JEU_WIDTH
 * @param int ZONE_JEU_WIDTH
 * @param int BARRE_JEU_HEIGHT
 * @param int MINX
 * @parma int PXL_DEPLA
 */
var Barre = function(BARREX, BARREY, BARRE_JEU_WIDTH, ZONE_JEU_WIDTH, BARRE_JEU_HEIGHT, MINX, PXL_DEPLA){
	this.barreX = BARREX;
	this.barreY = BARREY;
	this.barreWidth = BARRE_JEU_WIDTH;
	this.barreHeight = BARRE_JEU_HEIGHT;
	
	this.maxX = ZONE_JEU_WIDTH;
	this.minX = MINX;
	
	this.pixDepla = PXL_DEPLA;
};

/**
 * ...
 */
Barre.prototype.moveRight = function(){
	if ( (this.barreX+this.pixDepla+this.barreWidth) <= this.maxX ) 
    	this.barreX += this.pixDepla;
    else
    	this.barreX = this.maxX - this.barreWidth;
};

/**
 * ...
 */
Barre.prototype.moveLeft = function(){
	if ( ((this.barreX-this.pixDepla)) >= this.minX)
    	this.barreX -= this.pixDepla;
    else
    	this.barreX = this.minX;
};

/**
 * @param object context
 */
Barre.prototype.render =function(context){
	context.fillStyle = "#333333";
	context.fillRect(this.barreX,this.barreY,this.barreWidth,this.barreHeight);
};