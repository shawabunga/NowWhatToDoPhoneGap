//Js non utilise mais utile pour la rubrique contatc afin d'envoyer un mail

$(document).ready(function(){
	
	$("#sendMail").on('click',function()
	{
		var nom = document.getElementById("contactNom").value;
		var to = document.getElementById("contactTo").value;
		var msg = document.getElementById("contactMsg").value;
		alert("nom"+ nom+" to0" + to+ "mess" + msg);

				 var jsonTable = [];	
					 var identificationForm = {
							 nom: nom,
							 to: to,
							 msg: msg
					 }
					 
					jsonTable.push(identificationForm);
					
					
					 $.ajax({
					        url: '../../SendMail',
					        data: {
					        	identificationForm: JSON.stringify(jsonTable)
					        },
					        async: false,
					        type: 'POST',
					        dataType: 'json',
					        success: function (data) {
					        	alert("J'ai reussi !! yata!!");
					        	
					        },
					        error: function (data) {
					        	alert("Un problème est survenu, veuillez réessayer ultérieurement.");
					        }
					    });

	});
});