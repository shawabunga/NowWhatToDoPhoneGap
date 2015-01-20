//Gere l'affichage de la carte
var geocoder;
var map;
var lyon = new google.maps.LatLng(45.767, 4.833); //Coordonnées de Lyon

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = lyon; 
  var mapOptions = {
    zoom: 15,
    center: latlng
  }
  placerMarqueur();
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

//Place un marqueur sur la carte pour marquer l'adresse de l'activité
function placerMarqueur(){
	
		//Récupération des paramètres dans l'url
	var adresse = getUrlParameter('adresse');
	var codePostal = getUrlParameter('codePostal');
	
	//Récupération des caractères spéciaux (espace, accents...)
	adresse = decodeURI(adresse);
	
	var recherche = adresse + " " + codePostal;
	geocoder.geocode ({"address" : recherche}, function (results, status){
		
		if(status == google.maps.GeocoderStatus.OK){
			map.setCenter(results[0].geometry.location);
			
			var marker = new google.maps.Marker({
				map : map,
				animation: google.maps.Animation.DROP,
				position : results[0].geometry.location
			});
		} else{
			alert('Pas d\'adresse trouvée');
		}
	});
	
}

//Récupéré sur
//http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
//Récupère les paramètres dans l'url
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



google.maps.event.addDomListener(window, 'load', initialize);
