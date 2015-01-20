//Function generique qui recupere une liste d'activite selon le domaine
function recupererActivite(domaine, elmToAppend)
{
	 //Tableau listant toutes les champs activité récupérés de la servlet
	 var activiteTable = [];
	 //Chemin en dur pour aller chercher le dossier image
	 var cheminImage = "../../img/";
	 
	 //A déplacer
	 //var arraySizeImages = buildArraySizeImages();
	 
	 $.ajax({
	        url: '../../RecupererActivite',
	        async: false,
	        type: 'GET',
	        data:{
	        	domaine: domaine
	        },
	        success: function (data) {
	        	for(var i=0; i<data.length; i++){
	        	
	        		var activite = [];
	        		var jsonActivite = data[i];
	        		
	        		activite['id'] = jsonActivite.id;
	        		activite['nomActivite'] = jsonActivite.nomActivite;
	        		activite['description'] = jsonActivite.Description;
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
	        	afficherHtmlActivite(elmToAppend, activiteTable, cheminImage/*, arraySizeImages*/);
	        },
	        error: function (data) {
	        	alert("Un problème est survenu, veuillez réessayer ultérieurement.");
	        }
	    });	
}
	

//Functiuon qui affiche les données en code html
function afficherHtmlActivite(elmToAppend, activiteTable, cheminImage/*, arraySizeImages*/){	
	$.each(activiteTable,function(key,value){			
		var stringNomActivite = "";
		if(value['nomActivite'] != ""){
			stringNomActivite = value['nomActivite'];
		}
		
		var stringDescription = "";
		if(value['Description'] != ""){
			stringDescription = "<p class='text-justify'>"+value['description']+"</p>";
		}
				
		var stringNomLieu = "";
		if(value['nomLieu'] != ""){
			stringNomLieu = "Lieu : " + value['nomLieu'];
		}
		
		var stringAdresse = "";
		if(value['adresse'] != ""){
			stringAdresse = ";&nbsp;&nbsp;&nbsp;&nbsp;Adresse : " + value['adresse'];
		}
		
		var stringCodePostal = "";
		if(value['codePostal'] != ""){
			stringCodePostal = " " + value['codePostal'];
		}
		
		var stringVille = "";
		if(value['ville'] != ""){
			stringVille = " " + value['ville'];
		}
		
		var stringSiteWeb = "";
		if(value['siteWeb'] != ""){
			stringSiteWeb = "<a class='btn btn-md btn-theme' href=" + value['siteWeb'] + " target='blank'>Site internet</a>";
		}
		
		var stringCarte = "";
		if((value['adresse'] !="") && (value['codePostal'] != "")){
			stringCarte = "<a class = 'btn btn-md btn-theme' href='../Domaines/affichageCarte.html?adresse=" +value['adresse'] +"&codePostal="+ value['codePostal']+"' target='_blank'> Carte </a>";
		}
		
		var stringTelephone = "";
		if(value['telephone'] != ""){
			stringTelephone = "Informations au : " + value['telephone'] + ",";
		}
		
		var stringEmail = "";
		if(value['email'] != ""){
			stringEmail = " Contact par mail : " + value['email'];
		}
		
		var stringLienPhoto = "";
		if(value['lienPhoto'] != ""){
			stringLienPhoto = "<img src='" + cheminImage + value['lienPhoto'] + "' width='50%' height='50%' style='max-heigth: 100px; max-width: 100px;' alt='Image activite'/>";
			/*stringLienPhoto = "<img src='"+cheminImage+value['lienPhoto']+"' width='"+arraySizeImages['SNCF']['width']+"' height='"+arraySizeImages['SNCF']['height']+"' alt='image'/></td></tr>";*/
		}
		
		var stringImportance ="";
		if(value['importance'] != "")
		{
			stringImportance = value['importance'];
		}
		
		var stringDivActivite = 			
			"<div class='col-lg-6 col-md-6 col-sm-6 mb'>"
				+ "<div class='product-panel-2 pn' style='padding: 5px;'>"
					+"<h2>" + stringNomActivite + "<button class='btn btn-sm btn-theme pull-right' type='button' onclick='selectionActivite(" + value['id'] + ");' >A faire</button></h2>"
					+"<p class='text-justify'>" + stringNomLieu + stringAdresse + stringCodePostal + stringVille + "</p>"
					+"<p class='text-justify'>" + stringTelephone + stringEmail + "</p>"
					+"<div class='col-lg-4 col-md-4 col-sm-4 centered'>" + stringSiteWeb + "</div>"
					+"<div class='col-lg-4 col-md-4 col-sm-4 centered'>" + stringCarte + "</div>"
					+"<div class='col-lg-4 col-md-4 col-sm-4 centered'>" + stringLienPhoto + "</div>"
					+"<div class='col-lg-12 col-md-12 col-sm-12'><p class='text-justify'>" + stringDescription + "</p></div>"				
				+"</div>"
			+"</div>";
		
		elmToAppend.append(stringDivActivite);
	});
}

/*
//Gere la taille des images
function buildArraySizeImages(){
	 var arraySizeImages = [];
	 var arraySizes = [];
	 
	 arraySizes["width"] = 100;
	 arraySizes["height"] = 60;
	 
	 arraySizeImages["SNCF"] = arraySizes;
	 
	 return arraySizeImages;
}*/

/*Lors du clic sur le bouton avancement d'une activité, permet l'appel de la Servlet pour enregistrer l'activité selectionnée dans la BD*/
function selectionActivite(idActivite)
{
	$.ajax({
        url: '../../CompteAvancement',
        data: {
        	idActivite: idActivite
        },
        async: true,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.etat == "ok")
    		{
        		alert("Cette activité a été ajoutée à votre liste d'activité.");
    		}
        	else if(data.etat == "pb")
    		{
        		alert("Un problème est survenu, veuillez réessayer ultérieurement.");
    		}
        	else
    		{
        		alert("Vous devez vous connecter pour ajouter cette activité à votre liste d'activité.");
        		//Il est mal venu de rediriger....
            	//location.href = "../compte/login.html";
    		}
        },
        error: function (data) {
        	alert("Un problème est survenu, veuillez réessayer ultérieurement.");
        }
    });
}

