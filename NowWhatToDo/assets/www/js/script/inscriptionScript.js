//Verifie en asyn si le login choisi est deja utilise -> unicite du login
function verifUniciteLogin()
{
	var login = document.getElementById("login").value;
	if(login != "" && verifNom(document.getElementById("login")))
	{
		$.ajax({
	        url: '../../Inscription',
	        data: {
				login : login
	        },
	        async: true,
	        type: 'GET',
	        dataType: 'json',
	        success: function (data) {
	        	//Enlève pour pb lors du second affichage
  				$('#messageErreur').removeClass('messageErreur');
  				$('#messageErreur').removeClass('messageValidation');
  			
  				var span = document.createElement("span");
  				var text;
	    
  				if(data.texte == "existe")
        		{
	        		$('#messageErreur').addClass('messageErreur');
	  				text = document.createTextNode("Ce login existe déja. Veuillez en choisir un autre.");
        		}
	        	else
        		{
	        		$('#messageErreur').addClass('messageValidation');
	  				text = document.createTextNode("Ce login n'existe pas. C'est OK !");
	  			}	
	        	
  				span.appendChild(text);	
	        	//Permet de supprimer si un message est déja présent
	        	var elm = document.getElementById('messageErreur');
	        	while (elm.firstChild) {
	        		  elm.removeChild(elm.firstChild);
	        		}
	        	elm.appendChild(span);
	        }
	    });
	}
}

//Les champs ont déja été vérifiés en js donc on va envoyer à la Servlet les données en format JSON
//On gère la réponse de la Servlet avec une alert + redirection
function ajaxInscription()
{
	var login = document.getElementById("login").value;
	var mdp = document.getElementById("password").value;
	var mdpBis = document.getElementById("passwordBis").value;
	var email = document.getElementById("email").value;
	var nom = document.getElementById("nom").value;
	var prenom = document.getElementById("prenom").value;
	var age = document.getElementById("age").value;
	var adresse = document.getElementById("adresse").value;
	var codePostal = document.getElementById("codePostal").value;
	var telephone = document.getElementById("telephone").value;

	//Verifie si les champs ont ete remplis
	if(login != "" && mdp != "" && mdpBis != "" && email != "" && nom != "" && prenom != "" && age != "" && adresse != "" && codePostal != "" && telephone != ""
		&& verifNom(document.getElementById("login")) && verifMdp(document.getElementById("password")) && verifMdpBis(document.getElementById("passwordBis")) &&
		verifEmail(document.getElementById("email")) && verifNom(document.getElementById("nom")) && verifNom(document.getElementById("prenom")) &&
		verifAge(document.getElementById("age")) && verifString(document.getElementById("adresse")) && verifCodePostal(document.getElementById("codePostal")) &&
		verifTelephone(document.getElementById("telephone")) )
	{
		$.ajax({
	        url: '../../Inscription',
	        data: {
				login : login,
				mdp : mdp,
				mdpBis : mdpBis,
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
	        	alert("Votre compte a été crée avec success");
	        	location.href = "../accueil/accueil.html";
	        },
	        error: function (data) {
	        	alert("Un problème est survenu, veuillez réessayer ultérieurement.");
	        }
	    });
	}
	else
	{
		alert("Veuillez remplir le formulaire !");
	}
}
