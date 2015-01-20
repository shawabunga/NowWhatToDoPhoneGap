//JSON Array qui va contenir toutes les activités
var jsonArray = new Array();

//Au chargement de la page, affiche les activités sur la page d'administration
function afficherActivites() {
	
	//Récupération du JSONArray contenant toutes les activités
	getActivites();

	// Récupération du JSON de chaque activité et de chaque
	// champ dans chacune des activités
	for (i = 0; i < jsonArray.length; ++i) {
		var activiteJson = jsonArray[i];

		var id = activiteJson.id;
		var nomActivite = activiteJson.nomActivite;
		var description = activiteJson.description;
		var nomLieu = activiteJson.nomLieu;
		var adresse = activiteJson.adresse;
		var ville = activiteJson.ville;
		var codePostal = activiteJson.codePostal;
		var siteWeb = activiteJson.siteWeb;
		var telephone = activiteJson.telephone;
		var email = activiteJson.email;
		var domaine = activiteJson.domaine;
		var lienPhoto = activiteJson.lienPhoto;
		var importance = activiteJson.importance;
								
		// Récupération du tableau dans la page HTML
		var tableauHtml = document
				.getElementById("tableauActivites");

		// Ajout d'une ligne
		tableauHtml.innerHTML += "<tr id=ligne" + id + ">";
		var ligne = document.getElementById("ligne" + id);

		// R�cup�ration et �criture de chaque champ dans le
		// tableau HTML
		var colonneDomaine = ligne.insertCell(-1);// on a une
		// ajout�
		// une
		// cellule
		colonneDomaine.innerHTML += "<td>" + domaine + "</td>";

		var colonneActivite = ligne.insertCell(1);// on ajoute
		// la
		// seconde
		// cellule
		colonneActivite.innerHTML += "<td>" + nomActivite
				+ "</td>";

		var colonneLieu = ligne.insertCell(2);
		colonneLieu.innerHTML += "<td>" + nomLieu + "</td>";

		var colonneAdresse = ligne.insertCell(3);
		colonneAdresse.innerHTML += "<td>" + adresse + "</td>";

		var colonneVille = ligne.insertCell(4);
		colonneVille.innerHTML += "<td>" + ville + "</td>";

		var colonneCodePostal = ligne.insertCell(5);
		colonneCodePostal.innerHTML += "<td>" + codePostal
				+ "</td>";

		var colonneSiteWeb = ligne.insertCell(6);
		colonneSiteWeb.innerHTML += "<td>" + siteWeb + "</td>";

		var colonneTelephone = ligne.insertCell(7);
		colonneTelephone.innerHTML += "<td>" + telephone
				+ "</td>";

		var colonneImportance = ligne.insertCell(8);
		colonneImportance.innerHTML += "<td>" + importance
				+ "</td>";

		var colonneBoutons = ligne.insertCell(9);
		colonneBoutons.innerHTML += "<td>"
				+ "<button type=\"submit\" class =\"btn btn-danger btn-sm\" onclick=\"supprimerActivite("+ id +")\">"
				+ "<span class=\"glyphicon glyphicon-remove\">"
				+ "</span>"
				+ "</button>"
				+ "<button type=\"submit\" class=\"btn btn-success btn-sm\" onclick=\"modifierActivite("+ id +")\">"
				+ "<span class=\"glyphicon glyphicon-pencil\">"
				+ "</span>" + "</button>" + "</td>";

		// Fermeture de la balise ligne
		tableauHtml.innerHTML += "</tr>";
}
	}

// Récupère les Activités stockées dans la base de données
function getActivites() {
	var i=0;
	$.ajax({
				url : '../../AdminActivite',
				async : false,
				type : 'GET',
				dataType : 'json',
				success : function(data) {
					//Vérification de la connexion à un compte admin
					if(data.connecte == "oui")
					{			
						//var jsonArray = new Array();
						jsonArray = data.listeActivites;		
					}
					//Si pas de connexion a un compte admin redirection vers la page de login
					else
					{
						location.href = "loginAdmin.html";
					}
				},
				error : function(data) {
					alert("Les activités n'ont pas pu être chargées correctement.");
				}
			});

}

function supprimerActivite(idActivite) {
	
	//Affichage d'une alerte, si acceptiation de la suppression, suppression de l'activité en BDD
	  if (confirm("Supprimer cette activité?") == true) {
		  
		  $.ajax({
		        url: '../../AdminActivite',
		        data: {
					action : "supprimer",
					id : idActivite
		        },
		        async: false,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
		        	alert("Activité supprimée avec succès");
		        	location.href = "adminActivite.html";
		        },
		        error: function (data) {
		        	alert("Un problème est survenu, veuillez réessayer ultérieurement.");
		        }
		    });
	    } 

}

function modifierActivite(idActivite) {
	console.log("modif");
	
	//Renvoi vers le formulaire de modification d'activité avec l'id de l'activité en paramètre
	location.href="creerActivite.html?id="+idActivite;
}

