//Recherche par mot cle
function lancerRecherche()
{
	var activiteTable = [];
	var motCle = document.getElementById("inputMotCle").value;
	var cheminImage = "../../img/";
	if(motCle.match(/^[A-Za-z0-9_-]{3,30}$/) && motCle != "")
	{
		$.ajax({
	        url: '../../Recherche',
	        data: {
	        	motCle : motCle
	        },
	        async: true,
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	        	
	        	//Message qui s'affiche si aucun résultat n'est trouvé soit quand data est vide
	        	if(jQuery.isEmptyObject(data)){
	        		
	        		$('#messageVide').addClass('messageVide');
	        		var span = document.createElement("p");
	        		var text = document.createTextNode("Aucun résultat.");
	        		span.appendChild(text);	
	            	//Permet de supprimer si un message est déja présent
	            	var elm = document.getElementById('messageVide');
	            	while (elm.firstChild) {
	            		  elm.removeChild(elm.firstChild);
	            	}
	        		elm.appendChild(span);
	        		
	        	}
	        	//Si la recherche retourne des résultats
	        	else{
	        		
	        		//Suppression des éventuels messages d'erreurs (pas d'activité trouvée)
	        		var elementMessageVide = document.getElementById('messageVide');
	        		while (elementMessageVide.firstChild){
	        			elementMessageVide.removeChild(elementMessageVide.firstChild);
	        		}
	        		
	        		//Suppression des éventuels messages d'erreurs (champ rempli avec moins de 3 caractères)
	        		var elementMessageErreur = document.getElementById('messageErreur');
	        		while (elementMessageErreur.firstChild){
	        			elementMessageErreur.removeChild(elementMessageErreur.firstChild);
	        		}
	        		
	        		//On construit une liste de tableaux d'activité
	        		for(var i=0; i<data.length; i++){
	    	        	
		        		var activite = [];
		        		var jsonActivite = data[i];
		        		
			        	activite['nomActivite'] = jsonActivite.nomActivite;
			        	activite['Description'] = jsonActivite.Description;
			        	activite['nomLieu'] = jsonActivite.nomLieu;
			        	activite['adresse'] = jsonActivite.adresse;
			        	activite['ville'] = jsonActivite.ville;
			        	activite['codePostal'] = jsonActivite.codePostal;
			        	activite['siteWeb'] = jsonActivite.siteWeb;
			        	activite['telephone'] = jsonActivite.telephone;
			        	activite['email'] = jsonActivite.email;
			        	activite['domaine'] = jsonActivite.domaine;
			        	activite['lienPhoto'] = jsonActivite.lienPhoto;
			        	activite['importance'] = jsonActivite.importance;
		        		
		        		activiteTable.push(activite);	
	        		}
	        		
		        	//Enlève pour pb lors du second affichage ( addition des recherches par défault)
	        		var elm = document.getElementById("resultatRecherche");
		        	while (elm.firstChild) { 
		        		  elm.removeChild(elm.firstChild);
		        		}

	        		//Affichage du résultat de la recherche dans le div 
	        		afficherHtmlActivite($("#resultatRecherche"), activiteTable, cheminImage/*, arraySizeImages*/);
	        	}
	        }
	    });
	}
	else
	{
		//Message d'erreur si mauvaise saisie du mot (moins de 3 caractères)
		$('#messageErreur').addClass('messageErreur');
		var span = document.createElement("span");
		var text = document.createTextNode("Veuillez rentrez un mot clé d'au moins 3 caractères avant de lancer la recherche !");
		span.appendChild(text);	
    	//Permet de supprimer si un message est déja présent
    	var elm = document.getElementById('messageErreur');
    	while (elm.firstChild) {
    		  elm.removeChild(elm.firstChild);
    		}
		elm.appendChild(span);
	}

}


	