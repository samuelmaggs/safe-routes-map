var firstClick = 0; // variable just to check if user has already clicked past the splash screen

var myStyle = [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "water",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
      ]
    },{
           featureType: 'road.highway',
           elementType: 'geometry',
           stylers: [
             { visibility: "on" }
           ]
         }
  ];

map = new google.maps.Map(document.getElementById('map'), {
center: {lat: 51.380000, lng: -2.360000},
zoom: 13,
zoomControl: true,
gestureHandling: 'true',
streetViewControl: false,
mapTypeControlOptions: {
  position: google.maps.ControlPosition.TOP_RIGHT
},
mapTypeId: 'mystyle'
});

map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));


function toggleSplash() {
  document.getElementById('splash').classList.toggle('hidden');
  if (firstClick == 0) {
    firstClick = 1;
    var userloc = new google.maps.Marker({
    clickable: false,
    icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
new google.maps.Size(22,22),
new google.maps.Point(0,18),
new google.maps.Point(11,11)),
    shadow: null,
    zIndex: 999,
    map: map
});

if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
    var user = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    userloc.setPosition(user);
}, function(error) {
    alert("Error: Please report to admin - xxxx");
    console.log("Error getting the location of user - Are you using https?");
});
  }
};