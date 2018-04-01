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
          // define the size of the marker image.
          size: new google.maps.Size(7, 26),
          // define the orgin of the image.
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

function setMarkers() {
  setCabMarkers(map);
  setAEDMarkers(map);
  setOldfieldMarkers(map);
  setNewbridgeMarkers(map);
  setSouthdownMarkers(map);
  setOdddownMarkers(map);
  setWestonMarkers(map);
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

var oldfieldRoutePOI = [
  ['Al Falafel', 51.38153, -2.363097],
  ['Toilets', 51.381701840809846, -2.363094538450241],
  ['Cash Machine', 51.381381, -2.367846]
];

var oldfieldMarkers = {};
function setOldfieldMarkers(map) {
  
        var image = {
          url: 'https://itsthe.space/Projects/safe-routes-map/img/defib-marker.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(15, 15),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(7, 7)
        };
  
        // Adds markers to the map.
        for (var i = 0; i < oldfieldRoutePOI.length; i++){
          var POI = oldfieldRoutePOI[i];
          oldfieldMarkers[POI] = new google.maps.Marker({
            position: {lat: POI[1], lng: POI[2]},
            map: map,
            title: POI[0],
            visible: false
          });
        }
}

var twertonMillRouteCo = []
var newbridgeRouteCo = [
  {lat: 51.38490042955493, lng: -2.3619975785275074},
  {lat: 51.38464099019319, lng: -2.36341588336208},
  {lat: 51.384595206627324, lng: -2.363481092771991},
  {lat: 51.384498552274266, lng: -2.3634647904283668},
  {lat: 51.383801617489496, lng: -2.3631958015812984},
  {lat: 51.38320641661073, lng: -2.3671083666384902},
  {lat: 51.38337429457917, lng: -2.3678439135624956},
  {lat: 51.38349638725276, lng: -2.368650880103587},
  {lat: 51.383669351314694, lng: -2.369686079614894},
  {lat: 51.383903360473425, lng: -2.3710473262112544},
  {lat: 51.38415771689512, lng: -2.372115130427545},
  {lat: 51.38430015588736, lng: -2.3728751041794567},
  {lat: 51.384559597181266, lng: -2.3737146754431535},
  {lat: 51.38488008144654, lng: -2.3745950025837317},
  {lat: 51.38509882341316, lng: -2.3751837879842697},
  {lat: 51.38523617247293, lng: -2.3757380680396523},
  {lat: 51.38532265129518, lng: -2.3763657086944363},
  {lat: 51.38551086935027, lng: -2.3777921647008498},
  {lat: 51.3855617389608, lng: -2.378379049461188},
  {lat: 51.38551086935027, lng: -2.379014841287784},
  {lat: 51.38542947785359, lng: -2.3796424819250035},
  {lat: 51.385287042388825, lng: -2.38013155257039},
  {lat: 51.384742731402866, lng: -2.3816979997095586},
  {lat: 51.38450363945833, lng: -2.382423454479323},
  {lat: 51.384325591451926, lng: -2.3832467233817454},
  {lat: 51.38419841388429, lng: -2.38378470107574},
  {lat: 51.384183152551344, lng: -2.3841188993503977},
  {lat: 51.38445276867162, lng: -2.3861729960116236},
  {lat: 51.38457485847698, lng: -2.3865405835433364},
  {lat: 51.384798688921705, lng: -2.387054107704188},
  {lat: 51.38613054159845, lng: -2.3891657845927625},
  {lat: 51.38617123674143, lng: -2.3893777152017037},
  {lat: 51.387214037417806, lng: -2.3919208825082876},
  {lat: 51.387533282062066, lng: -2.3928526670216854},
  {lat: 51.38768152812713, lng: -2.393540785020832},
  {lat: 51.38781764131937, lng: -2.3946793845525747},
  {lat: 51.388033904054424, lng: -2.395659350260388},
  {lat: 51.388030071400266, lng: -2.3956822712642065},
  {lat: 51.388428995451164, lng: -2.3966888265224497}
]

var newbridgeRoutePOI = [
  ['Al Falafel', 51.38153, -2.363097],
  ['Toilets', 51.381701840809846, -2.363094538450241],
  ['Cash Machine', 51.381381, -2.367846]
];

var newbridgeMarkers = {};
function setNewbridgeMarkers(map) {
  
        var image = {
          url: 'https://itsthe.space/Projects/safe-routes-map/img/defib-marker.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(15, 15),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(7, 7)
        };
  
        // Adds markers to the map.
        for (var i = 0; i < newbridgeRoutePOI.length; i++){
          var POI = newbridgeRoutePOI[i];
          newbridgeMarkers[POI] = new google.maps.Marker({
            position: {lat: POI[1], lng: POI[2]},
            map: map,
            title: POI[0],
            visible: false
          });
        }
}


var westonRouteCo = [
  {lat: 51.381531, lng: -2.360406},
  {lat: 51.381365, lng: -2.362393},
  {lat: 51.381391, lng: -2.362741},
  {lat: 51.382001, lng: -2.363696},
  {lat: 51.382515, lng: -2.364908},
  {lat: 51.382736, lng: -2.365584},
  {lat: 51.383164, lng: -2.367096},
  {lat: 51.383449, lng: -2.368265},
  {lat: 51.384065, lng: -2.371720},
  {lat: 51.384373, lng: -2.373179},
  {lat: 51.385056, lng: -2.375003},
  {lat: 51.385256, lng: -2.375766},
  {lat: 51.385336, lng: -2.376517},
  {lat: 51.385544, lng: -2.378331},
  {lat: 51.385525, lng: -2.378882},
  {lat: 51.385425, lng: -2.379580},
  {lat: 51.385237, lng: -2.380234},
  {lat: 51.384903, lng: -2.381146},
  {lat: 51.384569, lng: -2.382133},
  {lat: 51.384341, lng: -2.383163},
  {lat: 51.384180, lng: -2.383914},
  {lat: 51.384301, lng: -2.385137},
  {lat: 51.384435, lng: -2.386188},
  {lat: 51.384555, lng: -2.386660},
]

var westonRoutePOI = [
  ['Al Falafel', 51.38153, -2.363097],
  ['Toilets', 51.381701840809846, -2.363094538450241],
  ['Cash Machine', 51.381381, -2.367846]
];

var westonMarkers = {};
function setWestonMarkers(map) {
  
        var image = {
          url: 'https://itsthe.space/Projects/safe-routes-map/img/defib-marker.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(15, 15),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(7, 7)
        };
  
        // Adds markers to the map.
        for (var i = 0; i < westonRoutePOI.length; i++){
          var POI = westonRoutePOI[i];
          westonMarkers[POI] = new google.maps.Marker({
            position: {lat: POI[1], lng: POI[2]},
            map: map,
            title: POI[0],
            visible: false
          });
        }
}


var bathSpaUniRouteCo = []
var bathUniRouteCo = []
var southdownRouteCo = [
  {lat: 51.381548, lng: -2.360407},
  {lat: 51.381374, lng: -2.362446},
  {lat: 51.381362, lng: -2.362690},
  {lat: 51.381289, lng: -2.362902},
  {lat: 51.381367, lng: -2.363248},
  {lat: 51.381242, lng: -2.363492},
  {lat: 51.381009, lng: -2.364361},
  {lat: 51.381538, lng: -2.365788},
  {lat: 51.381365, lng: -2.366007},
  {lat: 51.381452, lng: -2.366297},
  {lat: 51.381422, lng: -2.367611},
  {lat: 51.381502, lng: -2.367767},
  {lat: 51.381422, lng: -2.369153},
  {lat: 51.381405, lng: -2.370158},
  {lat: 51.380938, lng: -2.371419},
  {lat: 51.380945, lng: -2.371553},
  {lat: 51.380992, lng: -2.371709},
  {lat: 51.381243, lng: -2.372444},
  {lat: 51.381287, lng: -2.372685},
  {lat: 51.381333, lng: -2.372798},
  {lat: 51.381417, lng: -2.372910},
  {lat: 51.381370, lng: -2.373028},
  {lat: 51.381356, lng: -2.373371},
  {lat: 51.381353, lng: -2.373462},
  {lat: 51.381166, lng: -2.373580},
  {lat: 51.381189, lng: -2.373752},
  {lat: 51.381109, lng: -2.373806},
  {lat: 51.381238, lng: -2.374382},
  {lat: 51.381352, lng: -2.374940},
  {lat: 51.381432, lng: -2.375712},
  {lat: 51.381593, lng: -2.377182},
  {lat: 51.381740, lng: -2.378137},
  {lat: 51.382002, lng: -2.379832},
  {lat: 51.382142, lng: -2.380991},
  {lat: 51.382035, lng: -2.381034},
  {lat: 51.381914, lng: -2.381324},
  {lat: 51.381446, lng: -2.381560},
  {lat: 51.381211, lng: -2.381560},
  {lat: 51.380930, lng: -2.381452},
  {lat: 51.380528, lng: -2.381442},
  {lat: 51.379571, lng: -2.381120},
  {lat: 51.379109, lng: -2.381173},
  {lat: 51.378747, lng: -2.381688},
  {lat: 51.378921, lng: -2.383126},
  {lat: 51.377702, lng: -2.383727},
  {lat: 51.376910, lng: -2.384188},
  {lat: 51.376696, lng: -2.384403},
  {lat: 51.376488, lng: -2.384574},
  {lat: 51.376213, lng: -2.384875},
  {lat: 51.375946, lng: -2.385207},
  {lat: 51.375604, lng: -2.385819},
  {lat: 51.375460, lng: -2.386065},
  {lat: 51.375272, lng: -2.386355},
  {lat: 51.374951, lng: -2.386763},
  {lat: 51.375131, lng: -2.387203},
  {lat: 51.374549, lng: -2.387535},
  {lat: 51.374067, lng: -2.387879},
  {lat: 51.373805, lng: -2.388136},
  {lat: 51.373531, lng: -2.388415},
  {lat: 51.373182, lng: -2.388812},
  {lat: 51.372675, lng: -2.389329},
  {lat: 51.372367, lng: -2.389500},
  {lat: 51.371655, lng: -2.390054},
  {lat: 51.371293, lng: -2.390279}
]

var southdownRoutePOI = [
  ['Al Falafel', 51.38153, -2.363097],
  ['Toilets', 51.381701840809846, -2.363094538450241],
  ['Cash Machine', 51.381381, -2.367846]
];

var southdownMarkers = {};
function setSouthdownMarkers(map) {
  
        var image = {
          url: 'https://itsthe.space/Projects/safe-routes-map/img/defib-marker.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(15, 15),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(7, 7)
        };
  
        // Adds markers to the map.
        for (var i = 0; i < southdownRoutePOI.length; i++){
          var POI = southdownRoutePOI[i];
          southdownMarkers[POI] = new google.maps.Marker({
            position: {lat: POI[1], lng: POI[2]},
            map: map,
            title: POI[0],
            visible: false
          });
        }
}

var odddownRouteCo = [
  {lat: 51.381543, lng: -2.360410},
  {lat: 51.380718, lng: -2.360088},
  {lat: 51.379794, lng: -2.359724},
  {lat: 51.379602, lng: -2.359715},
  {lat: 51.379374, lng: -2.359720},
  {lat: 51.379163, lng: -2.359720},
  {lat: 51.378959, lng: -2.359720},
  {lat: 51.378775, lng: -2.359709},
  {lat: 51.378606, lng: -2.359709},
  {lat: 51.378529, lng: -2.359757},
  {lat: 51.378469, lng: -2.359822},
  {lat: 51.378436, lng: -2.359862},
  {lat: 51.378279, lng: -2.359728},
  {lat: 51.378198, lng: -2.359728},
  {lat: 51.378074, lng: -2.359739},
  {lat: 51.377937, lng: -2.359771},
  {lat: 51.377863, lng: -2.359836},
  {lat: 51.377840, lng: -2.359964},
  {lat: 51.377799, lng: -2.359990},
  {lat: 51.377705, lng: -2.359941},
  {lat: 51.377685, lng: -2.359899},
  {lat: 51.377665, lng: -2.359738},
  {lat: 51.377635, lng: -2.359625},
  {lat: 51.377598, lng: -2.359587},
  {lat: 51.377541, lng: -2.359598},
  {lat: 51.377484, lng: -2.359614},
  {lat: 51.377427, lng: -2.359646},
  {lat: 51.377360, lng: -2.359657},
  {lat: 51.377303, lng: -2.359668},
  {lat: 51.377209, lng: -2.359577},
  {lat: 51.377156, lng: -2.359507},
  {lat: 51.377102, lng: -2.359426},
  {lat: 51.377075, lng: -2.359335},
  {lat: 51.377072, lng: -2.359212},
  {lat: 51.377075, lng: -2.359148},
  {lat: 51.376921, lng: -2.359126},
  {lat: 51.376915, lng: -2.359239},
  {lat: 51.376921, lng: -2.359394},
  {lat: 51.376921, lng: -2.359534},
  {lat: 51.376942, lng: -2.359743},
  {lat: 51.376965, lng: -2.359990},
  {lat: 51.376995, lng: -2.360312},
  {lat: 51.376985, lng: -2.360414},
  {lat: 51.376948, lng: -2.360478},
  {lat: 51.376757, lng: -2.360719},
  {lat: 51.376520, lng: -2.361454},
  {lat: 51.376446, lng: -2.361548},
  {lat: 51.376145, lng: -2.362653},
  {lat: 51.375967, lng: -2.363273},
  {lat: 51.375900, lng: -2.363638},
  {lat: 51.375843, lng: -2.364555},
  {lat: 51.375752, lng: -2.365229},
  {lat: 51.375618, lng: -2.365578},
  {lat: 51.375394, lng: -2.365862},
  {lat: 51.375059, lng: -2.366114},
  {lat: 51.374557, lng: -2.366339},
  {lat: 51.374332, lng: -2.366404},
  {lat: 51.374178, lng: -2.366490},
  {lat: 51.373874, lng: -2.366458},
  {lat: 51.373379, lng: -2.366425},
  {lat: 51.372760, lng: -2.366372},
  {lat: 51.370328, lng: -2.365862},
  {lat: 51.369659, lng: -2.365905},
  {lat: 51.367730, lng: -2.366162},
  {lat: 51.366256, lng: -2.366248},
  {lat: 51.365707, lng: -2.366420},
  {lat: 51.364099, lng: -2.367750},
  {lat: 51.362732, lng: -2.369682},
  {lat: 51.361312, lng: -2.371484},
  {lat: 51.360153, lng: -2.372590},
  {lat: 51.359885, lng: -2.372976},
  {lat: 51.358538, lng: -2.375777}
]

var odddownRoutePOI = [
  ['Al Falafel', 51.38153, -2.363097],
  ['Toilets', 51.381701840809846, -2.363094538450241],
  ['Cash Machine', 51.381381, -2.367846]
];

var odddownMarkers = {};
function setOdddownMarkers(map) {
  
        var image = {
          url: 'https://itsthe.space/Projects/safe-routes-map/img/defib-marker.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(15, 15),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(7, 7)
        };
  
        // Adds markers to the map.
        for (var i = 0; i < odddownRoutePOI.length; i++){
          var POI = odddownRoutePOI[i];
          odddownMarkers[POI] = new google.maps.Marker({
            position: {lat: POI[1], lng: POI[2]},
            map: map,
            title: POI[0],
            visible: false
          });
        }
}

var larkhallRouteCo = []


// set all route properties
var oldfieldRoute = new google.maps.Polyline({
          path: oldfieldRouteCo,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          visible: false
        });

var odddownRoute = new google.maps.Polyline({
  path: odddownRouteCo,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  visible: false
});

var southdownRoute = new google.maps.Polyline({
  path: southdownRouteCo,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  visible: false
});

var westonRoute = new google.maps.Polyline({
  path: westonRouteCo,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  visible: false
});

var newbridgeRoute = new google.maps.Polyline({
  path: newbridgeRouteCo,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  visible: false
});

// function that will toggle a route - NEED TO ADD FUNCTION FOR WHEN ROUTE IS CLICKED
function toggleRoute(route, markers) {
  if(route.getVisible()) {
      route.setVisible(false);
    }
    else {
      route.setVisible(true);
    }
  for (var marker in markers) {
    if(markers[marker].getVisible()) {
      markers[marker].setVisible(false);
    }
    else {
      markers[marker].setVisible(true);
    }
  }
}

oldfieldRoute.setMap(map); //shows map on route
southdownRoute.setMap(map);
odddownRoute.setMap(map);
westonRoute.setMap(map);
newbridgeRoute.setMap(map);

// functions that should run at the beginning AFTER the map is init go here

setMarkers();

// end