var mapsApi = "AIzaSyBLylZUYb0UAI4-mRgItl36-bf6IlPMMxI";
var weatherApi = "bd198fc2c921dcda5323e5669a78656f";
var googlemapsUrl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  mapsApi +
  "&callback=initMap";
var initLat = "51.508742";
var initLng = "-0.120850";
var selectbtn = document.getElementById("select-btn");
var promptEl = document.getElementById("not-selected");


function getParams(event) {
  event.preventDefault();
  
  var city = document.getElementById("dark_select").value;
  console.log(city);
  if(!city) {
    promptEl.textContent= "Please Select a City to begin!";
    return;
  }
  var owUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    weatherApi;
  searchCity(owUrl);
  
}

function searchCity(owUrl) {
  promptEl.textContent= "";
  fetch(owUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      if (data) {
        console.log(data);
        var coorLat = data.coord.lat;
        var coorLon = data.coord.lon;

        initMap(coorLat, coorLon);
      }
    });
}

function initMap(coorLat, coorLon) {
  var city = document.getElementById("dark_select").value;
  initLat = coorLat;
  initLng = coorLon;
  var mapOption = {
    center: new google.maps.LatLng(initLat, initLng),
    zoom: 10,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOption);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(initLat, initLng),
    map: map,
    title: city
  });
}

selectbtn.addEventListener("click", getParams);
