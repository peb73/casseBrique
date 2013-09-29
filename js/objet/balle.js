/**
 * Class Balle
 *
 * @param int BALLEX
 * @param int BALLEY
 * @param int RAYON
 * @param int VITESSE
 * @param string COULEUR_BALLE
 * @param int VECTEURX
 * @param int VECTEURY
 */
var Balle = function(BALLEX, BALLEY, RAYON, VITESSE, COULEUR_BALLE, VECTEURX, VECTEURY){
	this.centre = new Point(BALLEX,BALLEY);
	this.rayon = RAYON;
	this.vitesse = VITESSE;
	this.vecteur = new Vecteur(VECTEURX,VECTEURY);
	this.couleur = COULEUR_BALLE;
};

/**
 * @return array
 */
Balle.prototype.getTableauPoint = function(){
	var tableauPoint = new Array();
	for(var i=0;i<2*Math.PI;i=i+2*Math.PI/16){
		var point = new Point(this.centre.X+Math.cos(i),this.centre.Y+Math.sin(i));
		tableauPoint.push(point);
	}
	return tableauPoint;
};

/**
 * ...
 */
Balle.prototype.move = function(){
	this.centre.X += this.vecteur.X * this.vitesse;
    this.centre.Y += this.vecteur.Y * this.vitesse;
};

/**
 * @return int
 */
Balle.prototype.produitVectorielRayonX = function(){
	return Math.cos(Math.atan(this.vecteur.Y/this.vecteur.X))*this.rayon;
};

/**
 * @return int
 */
Balle.prototype.produitVectorielRayonY = function(){
	return Math.cos(Math.atan(this.vecteur.X/this.vecteur.Y))*this.rayon;
};

/**
 * @param object context
 */
Balle.prototype.render = function(context){
	context.fillStyle = this.couleur;
    context.beginPath();
    context.arc(this.centre.X, this.centre.Y, this.rayon, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
};