function ajaxLoginAdmin()
{
	var login = document.getElementById("login").value;
	var mdp = document.getElementById("mdp").value;
	
	//Regex pour vérifier que les champs ont été remplis (équivalent des fonctions dans verificationFonctionScript.js) car
	//pb de ces fonctions avec JQuery
	if(login != "" && mdp != "")
	{
		if(login.match(/^[a-z0-9_-]{2,30}$/))
		{	
			if(mdp.match(/^[a-z0-9_-]{2,15}$/))
			{
				$.ajax({
			        url: '../../Login',
			        data: {
						login : login,
						mdp : mdp
			        },
			        async: false,
			        type: 'GET',
			        dataType: 'json',
			        success: function (data) {
			        	if(data.connecte == "oui")
		        		{
			        		location.href = "adminActivite.html";
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