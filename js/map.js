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
    // ...
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
  
          var image = {
          url: 'https://itsthe.space/Projects/safe-routes-map/img/river-marker.png',
          // define the size of the marker image
          size: new google.maps.Size(7, 26),
          // define the orgin of the image
          origin: new google.maps.Point(0, 0),
          // the point that will be over the coordinate
          anchor: new google.maps.Point(0, 26)
        };
  
        // Adds markers to the map.
        for (var i = 0; i < riverCabs.length; i++) {
          var cabinet = riverCabs[i];
          riverMarkers[cabinet] = new google.maps.Marker({
            position: {lat: cabinet[1], lng: cabinet[2]},
            map: map,
            title: cabinet[0],
            icon: image,
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
  
            var image = {
          url: 'https://itsthe.space/Projects/safe-routes-map/img/defib-marker.png',
          // define the size of the marker image.
          size: new google.maps.Size(15, 15),
          // define the orgin of the image.
          origin: new google.maps.Point(0, 0),
          // the point that will be over the coordinate
          anchor: new google.maps.Point(7, 7)
        };
  
        // Adds markers to the map.
        for (var i = 0; i < aedCabs.length; i++){
          var cabinet = aedCabs[i];
          aedMarkers[cabinet] = new google.maps.Marker({
            position: {lat: cabinet[1], lng: cabinet[2]},
            map: map,
            title: cabinet[0],
            icon: image,
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

// routes

function toggleRoutesPanel() {
  document.getElementById('routes-panel').classList.toggle('hidden');
}


var oldfieldRouteCo = [
    {lat: 51.378433, lng: -2.376569},
    {lat: 51.37861, lng: -2.376646},
    {lat: 51.378803, lng: -2.376588},
  {lat: 51.379004, lng: -2.376517},
  {lat: 51.379137, lng: -2.376214},
  {lat: 51.37937, lng: -2.375879},
  {lat: 51.379635, lng: -2.375641},
  {lat: 51.380918, lng: -2.374475},
  {lat: 51.381236, lng: -2.374203},
  {lat: 51.381111, lng: -2.373836},
  {lat: 51.381236, lng: -2.373662},
  {lat: 51.381332, lng: -2.373539},
   {lat: 51.381332, lng: -2.373353},
   {lat: 51.381256, lng: -2.373063},
   {lat: 51.381252, lng: -2.37267},
   {lat: 51.381228, lng: -2.372431},
   {lat: 51.380942, lng: -2.371729},
   {lat: 51.380902, lng: -2.371484},
   {lat:  51.38095, lng:-2.371239},
   {lat: 51.381063, lng: -2.37104},
   {lat:  51.38134, lng:-2.370286},
   {lat: 51.381389, lng: -2.370138},
   {lat: 51.381425, lng: -2.369158},
   {lat: 51.381361, lng: -2.369106},
   {lat: 51.381453, lng: -2.368178},
   {lat:51.381433, lng: -2.36783},
   {lat: 51.381377, lng: -2.367675},
   {lat: 51.381421, lng: -2.3662},
   {lat: 51.381497, lng: -2.365923},
   {lat: 51.381417, lng: -2.365523},
   {lat: 51.380942, lng: -2.364224},
   {lat: 51.381296, lng: -2.363335},
   {lat: 51.381377, lng: -2.362703},
   {lat: 51.381503, lng: -2.362507},
   {lat: 51.381692, lng: -2.36252},
   {lat: 51.381953, lng: -2.362398},
   {lat: 51.382226, lng: -2.362449},
   {lat: 51.382528, lng: -2.360991},
   {lat: 51.383361, lng: -2.361274},
   {lat: 51.384897, lng: -2.361983}
]

var twertonMillRouteCo = []
var NewbridgeRouteCo = []
var westonRouteCo = []
var bathSpaUniRouteCo = []
var bathUniRouteCo = []
var southdownRouteCo = []
var odddownRouteCo = []
var larkhallRouteCo = []

var oldfieldRoute = new google.maps.Polyline({
          path: oldfieldRouteCo,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          visible: false
        });

// function that will toggle a route
function toggleRoute(route) {
  if(route.getVisible()) {
      route.setVisible(false);
    }
    else {
      route.setVisible(true);
    }
}


oldfieldRoute.setMap(map); //shows map on route

// functions that should run at the beginning AFTER the map is init go here

setSOSMarkers();

// end