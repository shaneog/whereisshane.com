document.addEventListener("DOMContentLoaded", function(event) {
  "use strict";

  var map = L.map('map');
  var current_place;


  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    accessToken: 'pk.eyJ1Ijoic2hhbmVvZyIsImEiOiJ3M2pRekZzIn0.PBMF6qUP6jta6HsC-eU4PQ',
    id: 'mapbox.streets',
  }).addTo(map);


  var RedIcon = L.Icon.Default.extend({
    options: {
      imagePath: '/images/',
      iconUrl: 'marker-icon-red.png'
    }
  });
  var redIcon = new RedIcon();

  // Load the JSON data
  var request = new XMLHttpRequest();
  request.open('GET', 'data/data.geojson', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);

      var pu;

      var geojsonLayer = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          pu = layer.bindPopup(feature.properties.name);

          if (feature.properties.current == true){
            pu.setIcon(redIcon);
            current_place = pu;
          }
        }
      }).addTo(map);

      map.fitBounds(geojsonLayer.getBounds());

      current_place.openPopup();
    }
  };

  request.send();
});
