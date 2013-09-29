/**
 * Class Score
 *
 * @param string COULEUR
 */
function Score(COULEUR){
	this.value = 0,
	this.couleur = COULEUR
};

/**
 * @param int points
 */
Score.prototype.add = function(points){
	this.value = this.value + points;
};

/**
 * @param object context
 */
Score.prototype.render= function(context){
	context.fillStyle = this.couleur;
	context.font = "12px Helvetica";
	context.fillText("Score : "+this.value, 10, 15);	
};