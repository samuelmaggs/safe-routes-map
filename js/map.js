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