//Formulaire de login
function envoieFormulaire()
{
	var identifiant = $('#form_login :input[name="identifiant"]').val();
	var mdp = $('#form_login :input[name="motDePasse"]').val();

	//Regex pour vérifier que les champs ont été remplis (équivalent des fonctions dans verificationFonctionScript.js) car
	//pb de ces fonctions avec JQuery
	if(identifiant != "" && mdp != "")
	{
		if(identifiant.match(/^[a-z0-9_-]{2,30}$/))
		{	
			if(mdp.match(/^[a-z0-9_-]{2,15}$/))
			{
				 var jsonTable = [];	
				 var identificationForm = {
						 identifiant: identifiant,
						 motDePasse: mdp
				 }
				 
				jsonTable.push(identificationForm);
				 
				 $.ajax({
				        url: '../../Login',
				        data: {
				        	identificationForm: JSON.stringify(jsonTable)
				        },
				        async: false,
				        type: 'POST',
				        dataType: 'json',
				        success: function (data) {
				        	if(data.connecte == "oui"){
								location.href = "../accueil/accueil.html";
							}
							else
							{									
								$('#messageErreur').addClass('messageErreur');
				  				var span = document.createElement("span");
				  				var text = document.createTextNode("Ce couple login & mot de passe n'existe pas !");
				  				span.appendChild(text);	
					        	//Permet de supprimer si un message est déja présent
					        	var elm = document.getElementById('messageErreur');
					        	while (elm.firstChild) {
					        		  elm.removeChild(elm.firstChild);
					        		}
				  				elm.appendChild(span);
							}
				        },
				        error: function (data) {
				        	alert("Un problème est survenu, veuillez réessayer ultérieurement.");
				        }
				    });
			}
			else
			{
				alert("Le mot de passe comporte trop de caractères !");
			}
		}
		else{
			alert("Le login comporte trop de caractères !");
		}
	}
	else
	{
		alert("Veuillez remplir les champs !");
	}
}