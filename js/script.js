// Constantes du jeu
var NBR_LIGNES = 5;
var NBR_BRIQUES_PAR_LIGNE = 8;
var BRIQUE_WIDTH = 48;
var BRIQUE_HEIGHT = 15;
var ESPACE_BRIQUE = 2;
var BARRE_JEU_WIDTH = 80;
var BARRE_JEU_HEIGHT = 10;
var PXL_DEPLA = 20;
var ZONE_JEU_WIDTH = 400;
var ZONE_JEU_HEIGHT = 300;
var COULEURS_BRIQUES = ["#FFFFB7", "#84CA2B", "#8EDB95", "#F09D6B", "#FE365B"];
var COULEUR_BALLE = "#16A6DB";
var COULEUR_FPS = "#000000";
var COULEUR_SCORE = "#000000";
var DIMENSION_BALLE = 8;
var VITESSE_BALLE = 2;
var ZONE = DIMENSION_BALLE*4;
var POINTBRIQUE = 100;

var barre;
var balle;
var fps;
var score;

// Variables
//var tabBriques; // Tableau virtuel contenant les briques
var tabBrique;
var context;

var boucleJeu;
var limiteBriques = (ESPACE_BRIQUE+BRIQUE_HEIGHT)*NBR_LIGNES;
var aGagne = 0;

window.addEventListener('load', function () {
    // On récupère l'objet canvas
    var elem = document.getElementById('canvasElem');
    if (!elem || !elem.getContext) {
        return;
    }
 
    // On récupère le contexte 2D
    context = elem.getContext('2d');
    if (!context) {
        return;
    }
    
    // Initialisations des variables
    ZONE_JEU_WIDTH = elem.width;
    ZONE_JEU_HEIGHT = elem.height;
    barreX = (ZONE_JEU_WIDTH/2)-(BARRE_JEU_WIDTH/2);
    barreY = (ZONE_JEU_HEIGHT-BARRE_JEU_HEIGHT);
    
    fps = new Fps(ZONE_JEU_WIDTH,COULEUR_FPS);
    score = new Score(COULEUR_SCORE);
    barre= new Barre(barreX, barreY, BARRE_JEU_WIDTH, ZONE_JEU_WIDTH, BARRE_JEU_HEIGHT, 0, PXL_DEPLA);
    balle= new Balle(100, 250, DIMENSION_BALLE, VITESSE_BALLE, COULEUR_BALLE, 1, -1);
    
    // Le navigateur est compatible, le contexte a bien été récupéré, on peut continuer...
    
    creerBriques(context, NBR_LIGNES, NBR_BRIQUES_PAR_LIGNE, BRIQUE_WIDTH, BRIQUE_HEIGHT, ESPACE_BRIQUE);
    
    // Boucle de rafraichissement du contexte 2D
    boucleJeu = setInterval(refreshGame, 1000 / 50);
//    boucleJeu = setInterval(refreshGame, 500);
 
    // Gestion des évènements
    window.document.onkeydown = checkDepla;
    
 
}, false);
 
function refreshGame() {
 
    // On efface la zone
    clearContexte(context, 0, ZONE_JEU_WIDTH, 0, ZONE_JEU_HEIGHT);
 
    // On réaffiche le nécessaire
 
    
    // Réaffichage des briques
    
    aGagne = 1;
    tabBrique.forEach(function(y) { 
			var changeLimite=true;
			var tmpNewLimite;
   			y.forEach(function(x){
   				x.render(context);
   				tmpNewLimite=x.briqueY+x.briqueHeight;
   				if(x.vie>0){
   					aGagne=0;
   					changeLimite=false;
   				}
   			});
   			//limiteBriques = tmpNewLimite+balle.rayon;
		});
 	
    // On vérifie si le joueur à gagné
    if ( aGagne ) gagne();
 
    // Réaffichage de la barre
    barre.render(context);
    
    // Calcul de la nouvelle position de la balle
 
 	//Test collision avec bord et collision avec la barre.
    if ( (balle.centre.X + balle.rayon + balle.vecteur.X * balle.vitesse) >  ZONE_JEU_WIDTH) balle.vecteur.X = -1;
    else if ( (balle.centre.X - balle.rayon+ balle.vecteur.X * balle.vitesse) <  0) balle.vecteur.X = 1;
    if ( (balle.centre.Y + balle.rayon + balle.vecteur.Y * balle.vitesse) >  ZONE_JEU_HEIGHT) perdu();
    else {
        if ( (balle.centre.Y-balle.rayon + balle.vecteur.Y * balle.vitesse) <  0) balle.vecteur.Y = 1;
            else {
                if ( ((balle.centre.Y +balle.rayon+ balle.vecteur.Y * balle.vitesse) > (ZONE_JEU_HEIGHT - barre.barreHeight)) && ((balle.centre.X +balle.produitVectorielRayonX()+ balle.vecteur.X * balle.vitesse) >= barre.barreX) && ((balle.centre.X +balle.produitVectorielRayonX() + balle.vecteur.X * balle.vitesse) <= (barre.barreX+barre.barreWidth))) {
                balle.vecteur.Y = -1;
                balle.vecteur.X = 2*(balle.centre.X-(barre.barreX+barre.barreWidth/2))/barre.barreWidth;
            }
        }
    }
                
 	if ( balle.centre.Y <= limiteBriques) {
 		// On est dans la zone des briques
 		tabBrique.forEach(function(briqueY) { 
	 		briqueY.forEach(function(briqueYX){
	   			
	   			if(briqueYX.vie>0){
	   				
	   				if(briqueYX.isZoneBrique(balle.centre.X,balle.centre.Y)){
	   					var tableauPoint = balle.getTableauPoint();
						var tableauLength = tableauPoint.length;
						
						var isIn = false;
						for(var i=0; i<tableauLength;i++){
							var x = tableauPoint[i].X;
							var y=tableauPoint[i].Y;
							
							isIn = briqueYX.testDansLaBrique(x,y);
							if(isIn)
								break;
						}
						
						if(isIn){
						
							var collision=false;
							
							//a=(y-y')(x-x')
							//var a=balle.vecteurY/balle.vecteurX;
							//b=y-ax
							
							var cg = 0;
							var cd = 0;
							var ch=0;
							var cb=0;
							for(var i=0; i<tableauLength;i++){
	
					   			var a,b;
					   			
					   			a=tableauPoint[i].Y;
								b=tableauPoint[i].Y+balle.vecteur.Y*balle.vitesse;
					   			
					   			if(briqueYX.testCollisionB(a,b)){		
					   				collision=true;
					   				cb++;
					   			}
					   			if(briqueYX.testCollisionH(a,b)){
					   				collision=true;
					   				ch++;
					   			}
					   			
								a=tableauPoint[i].X;
								b=tableauPoint[i].X+balle.vecteur.X*balle.vitesse;
								
					   			if(briqueYX.testCollisionG(a,b)){				   				
					   				collision=true;
					   				cg++;
					   			}
					   			if(briqueYX.testCollisionD(a,b)){
					   				collision=true;
					   				cd++;
					   			}				   			
						   			
							}
							
							if(collision){
								collision = false;
								
								if(ch>=cg && ch>=cd && ch>=cb && !collision){
									balle.vecteur.Y = -balle.vecteur.Y;
									collision=true;
								}
								
								if(cb>=ch && cb>=cg && cb>=cd && !collision){
									balle.vecteur.Y = -balle.vecteur.Y;
									collision=true;
								}
								
								if(cg>=cd && cg>=ch && cg>=cb && !collision){
									balle.vecteur.X = -balle.vecteur.X;
									collision=true;
								}
									
								if(cd>=cg && cd>=ch && cd>=cb && !collision){
									balle.vecteur.X = -balle.vecteur.X;
									collision=true;
								}							
								
							}				
							
				   			if(collision){		   				
				   				score.add(briqueYX.touch());
				   			}
			   			
						}
	   				}
	   			
		   			briqueYX.render(context);
	   			}

	   		});
		});
   		
 	}

 
 	balle.move();
 
    // Affichage de la balle
    balle.render(context);
    
    fps.render(context);
    
    score.render(context);
    //context.font = "18px Helvetica";
    //context.fillText("Hello World", 0, 30); 
}

function checkDepla(e) {
    
    // 38, 40
    
    if (e.keyCode == 37) {
    	barre.moveLeft();
    }
    if (e.keyCode == 39) {
    	barre.moveRight();
    }

}

function perdu() {
    clearInterval(boucleJeu);
    alert("Perdu !");
}

function gagne() {
    clearInterval(boucleJeu);
    alert("Bravo vous avez gagné !");
}

function clearContexte(ctx, startwidth, ctxwidth, startheight, ctxheight) {
    ctx.clearRect(startwidth, startheight, ctxwidth, ctxheight);
}

// Fonction permettant de créer les briques du jeu
function creerBriques(ctx, nbrLignes, nbrParLigne, largeur, hauteur, espace) {
 
    // Tableau virtuel: On initialise les lignes de briques
    //tabBriques = new Array(nbrLignes);
    tabBrique = new Array();
 
    for (var i=0; i < nbrLignes; i++) {
 
        // Tableau virtuel: On initialise les briques de la ligne
        //tabBriques[i] = new Array(nbrParLigne);

        // Affichage: On attribue une couleur aux briques de la ligne
        //ctx.fillStyle = COULEURS_BRIQUES[i];

        for (var j=0; j < nbrParLigne; j++) {
 
            // Affichage: On affiche une nouvelle brique
            //ctx.fillRect((j*(largeur+espace)),(i*(hauteur+espace)),largeur,hauteur);
            var briqueX = j*(largeur+espace);
            var briqueY = i*(hauteur+espace);
 			var brique = new Brique(briqueX, briqueY, largeur, hauteur, COULEURS_BRIQUES[i],ZONE,POINTBRIQUE);
 			brique.render(ctx);
           // Tableau virtuel: On attribue à la case actuelle la valeur 1 = Une brique existe encore
           // tabBriques[i][j] = 1;
           	if(tabBrique[briqueY]==null)
	            tabBrique[briqueY] = new Array();
	        tabBrique[briqueY][briqueX] = brique;
 
        }
    }
    // Nos briques sont initialisées.
    return 1;
1}