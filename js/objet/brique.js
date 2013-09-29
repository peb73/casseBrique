/**
 * Class Brique
 *
 * @param int BRIQUEX
 * @param int BRIQUEY
 * @param int BRIQUEWIDTH
 * @param int BRIQUEHEIGHT
 * @param string COULEUR
 * @param int ZONE
 * @param Point point
 */
var Brique = function(BRIQUEX, BRIQUEY, BRIQUEWIDTH, BRIQUEHEIGHT, COULEUR, ZONE, POINT){
	this.briqueX = BRIQUEX,
	this.briqueY = BRIQUEY,
	this.briqueWidth = BRIQUEWIDTH,
	this.briqueHeight = BRIQUEHEIGHT,
	this.couleur = COULEUR,
	this.vie = 1,
	this.zone = ZONE,
	this.point = POINT
};


/**
 * return boolean
 */
Brique.prototype.touch = function(){
	this.vie--;
	return this.point;
};

/**
 * @param object context
 */
Brique.prototype.render =function(context){
	if(this.vie>0){
		context.fillStyle = this.couleur;
		context.fillRect(this.briqueX,this.briqueY,this.briqueWidth,this.briqueHeight);
	}
};

/**
 * @param int a
 * @param int b
 *
 * @return boolean
 */
Brique.prototype.testCollisionG=function(a,b){
	if(a<=this.briqueX && b>=this.briqueX)
		return true;
	return false;
};

/**
 * @param int a
 * @param int b
 * 
 * @return boolean
 */
Brique.prototype.testCollisionD=function(a,b){
	if(a>=this.briqueX+this.briqueWidth && b<=this.briqueX+this.briqueWidth)
		return true;
	return false;
};

/**
 * @param int a
 * @param int b
 * 
 * @return boolean
 */
Brique.prototype.testCollisionB=function(a,b){
	if(a<=this.briqueY && b>=this.briqueY)
		return true;
	return false;
};

/**
 * @param int a
 * @param int b
 * 
 * @return boolean
 */
Brique.prototype.testCollisionH=function(a,b){
	if(a>=this.briqueY+this.briqueHeight && b<=this.briqueY+this.briqueHeight)
		return true;
	return false;
};

/**
 * @param int x
 * @param int y
 * 
 * @return boolean
 */
Brique.prototype.testDansLaBrique=function(x,y){
	if(this.briqueX<=x && x<=this.briqueX+this.briqueWidth&&this.briqueY<=y && y<=this.briqueY+this.briqueHeight)
		return true;
	return false;
};

/**
 * @param int x
 * @param int y
 * 
 * @return boolean
 */
Brique.prototype.isZoneBrique=function(x,y){
	if(this.briqueX-this.zone<=x && x<=this.briqueX+this.briqueWidth+this.zone&&this.briqueY-this.zone<=y && y<=this.briqueY+this.briqueHeight+this.zone)
		return true;
	return false;
};