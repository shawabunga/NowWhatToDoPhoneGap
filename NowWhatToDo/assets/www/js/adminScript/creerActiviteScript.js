//Verifie l'authentication au chargement de la page
function verifAuthentication() {
	$.ajax({
		url : '../../CreerActivite',
		data : {},
		async : false,
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			// Verifie le log
			if (data.connecte == "non") {
				location.href = "loginAdmin.html";
			}
		}
	});
}


// Envoi du formulaire
// function envoyerFormulaire() {
function envoyerFormulaire()
{					
		//On vérifie que le formulaire est correctement rempli avant envoi
		if($("form")[0].checkValidity()) {
		// Récupération de l'id dans l'URL si existant
		var idActivite = getUrlParameter('id');

		// Récupération des valeurs du formulaire
		var domaine = document.getElementById("domaine").value;
		var activite = document.getElementById("activite").value;
		var lieu = document.getElementById("lieu").value;
		var adresse = document.getElementById("adresse").value;
		var ville = document.getElementById("ville").value;
		var codePostal = document.getElementById("codePostal").value;
		var siteWeb = document.getElementById("siteWeb").value;
		var telephone = document.getElementById("telephone").value;
		var email = document.getElementById("email").value;
		var description = document.getElementById("description").value;
		var lienPhoto = document.getElementById("lienPhoto").value;
		var importance = document.getElementById("importance").value;

		// Si on crée une activité
		if (idActivite == null) {

			$.ajax({
						url : '../../CreerActivite',
						data : {
							domaine : domaine,
							activite : activite,
							lieu : lieu,
							adresse : adresse,
							ville : ville,
							codePostal : codePostal,
							siteWeb : siteWeb,
							telephone : telephone,
							email : email,
							description : description,
							lienPhoto : lienPhoto,
							importance : importance
						},
						async : false,
						type : 'POST',
						dataType : 'json',
						success : function(data) {
							alert("Activité créee avec succès");
							location.href = "adminActivite.html";
							
						},
						error : function(data) {
							alert("Un problème est survenu, veuillez réessayer ultérieurement.");
						}
					});
		}

		// Si on veut modifier une activité
		else {
			$.ajax({
						url : '../../ModifierActivite',
						data : {
							id : idActivite,
							domaine : domaine,
							activite : activite,
							lieu : lieu,
							adresse : adresse,
							ville : ville,
							codePostal : codePostal,
							siteWeb : siteWeb,
							telephone : telephone,
							email : email,
							description : description,
							lienPhoto : lienPhoto,
							importance : importance
						},
						async : false,
						type : 'POST',
						dataType : 'json',
						success : function(data) {
							alert("Activité modifiée avec succès");
							location.href = "adminActivite.html";
						},
						error : function(data) {
							alert("Un problème est survenu, veuillez réessayer ultérieurement.");
						}
					});
		}
		} 
		//Si le formulaire est mal rempli, pas d'envoi du formulaire et messages d'erreur HTML5
		else{
			alert("Un champ du formulaire est mal rempli");
			console.log("INVALID FORM!")
		}
}

// Vérifie si le formulaire sert pour la création ou la modification d'activité
// (paramètre "id" dans l'url pour les modifications)
function verifierAction() {

	var idActivite = getUrlParameter('id');

	// Si on veut modifier une activite affiche les infos de l'activite à
	// modifier
	if (idActivite != null) {
		recupererActivite(idActivite);

		// Modification du texte dans le bouton d'envoi
		var boutonEnvoi = document.getElementById("buttonSend");
		boutonEnvoi.innerHTML = "Modifier l'activité";

		// Modification du titre du formulaire
		var titreFormulaire = document.getElementById("titleForm");
		titreFormulaire.innerHTML = "Modifier l'activité"
	}

}
// Récupéré sur
// http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
// Récupère l'id de l'activité à modifier dans l'URL
function getUrlParameter(parametre) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == parametre) {
			return sParameterName[1];
		}
	}
}

// Récupère les infos de l'activité à modifier dans la BDD et les affiche dans
// le formulaire
function recupererActivite(idActivite) {
	$.get('../../ModifierActivite', {
		id : idActivite
	}, function(data) {
		// Récupération des champs dans le formulaire HTML
		var champDomaine = document.getElementById("domaine");
		var champActivite = document.getElementById("activite");
		var champLieu = document.getElementById("lieu");
		var champAdresse = document.getElementById("adresse");
		var champVille = document.getElementById("ville");
		var champCodePostal = document.getElementById("codePostal");
		var champSiteWeb = document.getElementById("siteWeb");
		var champTelephone = document.getElementById("telephone");
		var champEmail = document.getElementById("email");
		var champDescription = document.getElementById("description");
		var champLienPhoto = document.getElementById("lienPhoto");
		var champImportance = document.getElementById("importance");

		// Ecriture des données récupérées dans la BDD dans les champs
		champDomaine.value = data.domaine;
		champActivite.value = data.nomActivite;
		champLieu.value = data.nomLieu;
		champAdresse.value = data.adresse;
		champVille.value = data.ville;
		champCodePostal.value = data.codePostal;
		champSiteWeb.value = data.siteWeb;
		champTelephone.value = data.telephone;
		champEmail.value = data.email;
		champDescription.value = data.description;
		champLienPhoto.value = data.lienPhoto;
		champImportance.value = data.importance;
	});
}