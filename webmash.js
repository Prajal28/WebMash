var username = "prajal";
var request = new XMLHttpRequest();
var xml;
var temperature = 29;
var windSpeed = 08;
var clouds = "scattered";
//initMap() which initiates map to a locationx  
function initMap() {
	//initialize map	
	//Initialize a mouse click event on map which then calls reversegeocode function
 var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.75, lng: -97.13},
          zoom: 17
        });
  var marker = new google.maps.Marker({
          position: map.getCenter(),
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5
          },
          draggable: true,
          map: map
        });
var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        
        //    alert(marker.getPosition());
       

      // This function is called when the user clicks the UI button requesting
      // a reverse geocode.
      google.maps.event.addListener(map,'click', function(event) {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          var latitude=event.latLng.lat();
          var longitude=event.latLng.lng();
         sendRequest(latitude,longitude);
         geocodeLatLng(geocoder, map, infowindow,latitude,longitude);
        });

}


// Reserse Geocoding 


  //get the latitude and longitude from the mouse click and get the address.
  //call geoname api asynchronously with latitude and longitude 
  function geocodeLatLng(geocoder, map, infowindow,latitude,longitude) {

/* marker.addListener('click', function() {
        
        map.setZoom(8);
        map.setCenter(marker.getPosition());
        
      });*/
         
        
        var latlng = {lat: latitude, lng: longitude};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng ,
                map: map
              });
             var history = results[1].formatted_address;
             var weather = "temperature: " + temperature +"Wind speed:" + windSpeed + "Clouds:"  + clouds;
             infowindow.setContent(history + weather);
             document.getElementById("history").innerHTML=document.getElementById("history").innerHTML + history + weather ;
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    }
// end of geocodeLatLng()



function displayResult () {
    if (request.readyState == 4) {
        xml = request.responseXML.documentElement;
        temperature = xml.getElementsByTagName("temperature")[0].childNodes[0].nodeValue;
        clouds = xml.getElementsByTagName("clouds")[0].childNodes[0].nodeValue;
        windSpeed = xml.getElementsByTagName("windSpeed")[0].childNodes[0].nodeValue;
	document.getElementById("temperature").innerHTML = temperature;
    document.getElementById("clouds").innerHTML = clouds;
    document.getElementById("windSpeed").innerHTML = windSpeed;
    }
}

function sendRequest (latitude,longitude) {
    request.onreadystatechange = displayResult;
    
    request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+latitude+"&lng="+longitude+"&username="+username);
   // request.withCredentials = "true";
    request.send();
}
function clearhistory()
{
    document.getElementById("history").innerHTML = "";
}