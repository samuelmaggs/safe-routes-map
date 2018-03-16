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

//markers and more

// rivercabs markers
var riverCabs = [
  ['S67', 51.382796, -2.356969],
  ['S65', 51.381707, -2.355840],
  ['S63', 51.380951, -2.355057],
  ['Cabinet 4', 51.377121, -2.355186],
  ['N64', 51.378076, -2.362142],
  ['N62', 51.378834, -2.364368],
  ['N60', 51.379360, -2.365340],
  ['N58', 51.379584, -2.366536],
  ['N56', 51.380471, -2.369111],
  ['N54', 51.381625, -2.369475],
  ['Cabinet 11', 51.382396, -2.370624],
  ['Cabinet 12', 51.383384, -2.372144],
  ['Cabinet 13', 51.383173, -2.372930],
  ['Cabinet 14', 51.382999, -2.372270],
];

var riverMarkers ={};
function setCabMarkers(map) {
        // Adds markers to the map.
        for (var i = 0; i < riverCabs.length; i++) {
          var cabinet = riverCabs[i];
          riverMarkers[cabinet] = new google.maps.Marker({
            position: {lat: cabinet[1], lng: cabinet[2]},
            map: map,
            title: cabinet[0],
            visible: false
          });
        }
}

// aed cab markers
var aedCabs = [
  ['Pines Way', 51.379871, -2.370674],
  ['Percy Community Centre', 51.382396, -2.366049],
  ['Westgate Buildings Tesco', 51.381088, -2.362538],
  ['Northgate House, Upper Borough Walls', 51.382798, -2.359526],
  ['North Parade (Phone Box)', 51.380742, -2.357395],
  ['Lewis House, Manvers Street', 51.379288, -2.357186],
  ['Southgate Shopping Centre', 51.378644, -2.358922],
  ['Widcome Baptist Church', 51.376692, -2.353337],
  ['Tesco, Bathwick Hill', 51.382743, -2.349138],
  ['Victoria Pub & Kitchen, Upper Bristol Road', 51.385415, -2.377966],
  ['Tesco, Windsor Bridge Junction', 51.384888, -2.381939],
  ['Genesis Lifestyle Centre', 51.383171, -2.388044],
  ['Golden Fleece Pub, Lower Bristol Road', 51.380736, -2.387932],
  ['Oldfield Park Baptist Church, Moorland Road', 51.378424, -2.380245],
  ['Oldfield Park Surgery, Junction Road', 51.376328, -2.374225],
  ['Tesco Wellsway', 51.370015, -2.366123],
  ['Rose Cottage, Twerton High Street', 51.380104, -2.395179],
  ['Tesco Weston High Street', 51.395616, -2.389932]
];


var aedMarkers = {};
function setAEDMarkers(map) {
        // Adds markers to the map.
        for (var i = 0; i < aedCabs.length; i++){
          var cabinet = aedCabs[i];
          aedMarkers[cabinet] = new google.maps.Marker({
            position: {lat: cabinet[1], lng: cabinet[2]},
            map: map,
            title: cabinet[0],
            visible: false
          });
        }
}

//toggles the AED markers visibility
function toggleAEDMarkers(){
  for (var marker in aedMarkers) {
        if(aedMarkers[marker].getVisible()) {
          aedMarkers[marker].setVisible(false);
        }
        else {
          aedMarkers[marker].setVisible(true);
        }
      }
}
//toggles the river cab markers visibility
function toggleRiverMarkers(){
  for (var marker in riverMarkers) {
        if(riverMarkers[marker].getVisible()) {
          riverMarkers[marker].setVisible(false);
        }
        else {
          riverMarkers[marker].setVisible(true);
        }
      }
}

function setSOSMarkers() {
  setCabMarkers(map);
  setAEDMarkers(map);
}

function toggleSOSMarkers(){
  toggleAEDMarkers();
  toggleRiverMarkers();
}


// functions that should run at the beginning AFTER the map is init go here

setSOSMarkers();

// end
