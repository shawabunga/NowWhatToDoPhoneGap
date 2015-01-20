//Récupère les infos du formulaire dans la BD pour afficher a l'ouverture de la page
function getDonnees()
{
	$.ajax({
        url: '../../Compte',
        data: {

        },
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
        	//Verifie le log
        	if(data.etat == "loge")
        	{
        		//Affiche les données chargées
        		var inputLogin = document.getElementById("login");
        		var inputEmail = document.getElementById("email");
        		var inputNom = document.getElementById("nom");
        		var inputPrenom = document.getElementById("prenom");
        		var inputAge = document.getElementById("age");
        		var inputAdresse = document.getElementById("adresse");
        		var inputCodePostal = document.getElementById("codePostal");
        		var inputTel = document.getElementById("telephone");
        		
        		inputLogin.value = data.login;
        		inputEmail.value = data.email;
        		inputNom.value = data.nom;
        		inputPrenom.value = data.prenom;
        		inputAge.value = data.age;
        		inputAdresse.value = data.adresse;
        		inputCodePostal.value = data.codePostal;
        		inputTel.value = data.tel;
        		
        		recupererAvancementActivite();        		
        	}
        	else
    		{
        		location.href = "login.html";
    		}	
        },
        error: function (data) {
        	alert("Un problème est survenu, veuillez recharger la page.");
        }
    });
}

//Met a jour les données du formulaire
function ajaxMiseAJour()
{
	var login = document.getElementById("login").value;
	var email = document.getElementById("email").value;
	var nom = document.getElementById("nom").value;
	var prenom = document.getElementById("prenom").value;
	var age = document.getElementById("age").value;
	var adresse = document.getElementById("adresse").value;
	var codePostal = document.getElementById("codePostal").value;
	var telephone = document.getElementById("telephone").value;

	if(login != "" && email != "" && nom != "" && prenom != "" && age != "" && adresse != "" && codePostal != "" && telephone != ""
		&& verifNom(document.getElementById("login")) && verifEmail(document.getElementById("email")) && verifNom(document.getElementById("nom")) && verifNom(document.getElementById("prenom")) &&
		verifAge(document.getElementById("age")) && verifString(document.getElementById("adresse")) && verifCodePostal(document.getElementById("codePostal")) &&
		verifTelephone(document.getElementById("telephone")) )
	{
		$.ajax({
	        url: '../../Compte',
	        data: {
				login : login,
				email : email,
				nom : nom,
				prenom : prenom,
				age : age,
				adresse : adresse,
				codePostal : codePostal,
				telephone : telephone
	        },
	        async: false,
	        type: 'POST',
	        dataType: 'json',
	        success: function (data) {
	        	//alert("Vos informations ont été modifiées avec success");
	        	location.href = "compte.html";
	        },
	        error: function (data) {
	        	alert("Un problème est survenu, veuillez réessayer ultérieurement.");
	        }
	    });
	}
	else
	{
		alert("Veuillez remplir tout le formulaire !");
	}
}

//Récupération de la structure tableau de json depuis la servlet CompteAvancement pour afficher les tâches dans compte suivant leur avancement
function recupererAvancementActivite(){

	$.ajax({
        url: '../../CompteAvancement',
        data: {
        },
        async: true,
        type: 'GET',
        dataType: 'json',
        success: function (data) {      		
	        		var arrayTermine = data[0].termine;
	        		for(var j=0; j<arrayTermine.length; j++){
	        			$("#blocTacheDone").append(getStringBlocTache(arrayTermine[j].nomActivite, arrayTermine[j].domaine, arrayTermine[j].description, arrayTermine[j].id, arrayTermine[j].avancement));
	        		}
	        		
	        		var arrayEnCours = data[1].enCours;
	        		for(var j=0; j<arrayEnCours.length; j++){
	        			$("#blocTacheCours").append(getStringBlocTache(arrayEnCours[j].nomActivite, arrayEnCours[j].domaine, arrayEnCours[j].description, arrayEnCours[j].id, arrayEnCours[j].avancement));
	        		}
	        		
	        		var arrayPasCommence = data[2].pasCommence;
	        		for(var j=0; j<arrayPasCommence.length; j++){
	        			$("#blocTacheToDo").append(getStringBlocTache(arrayPasCommence[j].nomActivite, arrayPasCommence[j].domaine, arrayPasCommence[j].description, arrayPasCommence[j].id, arrayPasCommence[j].avancement));
	        		}
        	}
    });
};

//Fonction retournant la string html contenant les informations sur l'activité: nom, domaine et description
function getStringBlocTache(nomActivite, nomDomaine, descriptif, id, avancement)
{	
	var chainechangerAvancementActivite = "";
	if(avancement < 2)
	{
		chainechangerAvancementActivite = "<button class='btn btn-md btn-theme pull-right' type='button' onclick='changerAvancementActivite(" + id + ");' >Avancer la tâche</button>"
	}
	var stringBlocTache = "<p><b>Activité: "
		+nomActivite+"</b>" + chainechangerAvancementActivite + "</p>"
		+"<p>Domaine: "+nomDomaine+"</p>"
		+"<p>"+descriptif+"</p>" 
	;	  
	return stringBlocTache;
}

//Permet de surclasser l'avancement de l'activité
function changerAvancementActivite(idAvancementActivite)
{
	$.ajax({
        url: '../../CompteAvancementBis',
        data: {
        	idAvancementActivite : idAvancementActivite
        },
        async: false,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	location.href = "compte.html";
        },
        error: function (data) {
        	alert("Un problème est survenu, veuillez recharger la page.");
        }
    });
}