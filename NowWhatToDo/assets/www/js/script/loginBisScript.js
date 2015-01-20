//Verifie si l'utilisateur est connecte pour afficher le bouton deconnexion
function afficherConnexionDeconnexion()
{
	$.ajax({
        url: '../../LoginBis',
        data: {

        },
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
        	var elm = $("#connexionDeconnexion");
        	var chaineConnexion = "<ul class='nav pull-right top-menu'><li><a class='logout' href='../Compte/login.html' style='margin-bottom: 10px;'>Connexion</a></li></ul>";
        	var chaineDeconnexion = "<ul class='nav pull-right top-menu'><li><a class='logout curseurMain' style='margin-bottom: 10px;' onclick='cheatDeconnexion();'>Deconnexion</a></li></ul>";
        	var chaineFormDeconnexion = "<form action='../../LoginBis' method='post' id='formDeconnexion' ></form>"
        	var chaineInscription = "<ul class='nav pull-right top-menu'><li><a class='logout' href='../Compte/inscription.html' style='margin-bottom: 10px;'>Inscription</a></li></ul>";
        	var chaineLogin = "<ul class='nav pull-right top-menu'><li><a class='logout' style='cursor: default; margin-bottom: 10px;'>Bienvenue " + data.login + "</a></li></ul>";
        		
        	if(data.etat == "loge")
    		{
        		elm.append(chaineInscription + chaineFormDeconnexion + chaineDeconnexion + chaineLogin);
    		}
        	else
    		{
        		elm.append(chaineInscription + chaineConnexion);
    		}
        }
    });
}