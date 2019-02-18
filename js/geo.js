$(document).ready(function () {
  "use strict";

  var map = L.map('map');
  var current_place;


  L.tileLayer('//{s}.tiles.mapbox.com/v3/{user}.{map}/{z}/{x}/{y}.png', {
    user: 'shaneog',
    map: 'hgobelh9'
  }).addTo(map);


  var RedIcon = L.Icon.Default.extend({
    options: {
      iconUrl: 'https://whereisshane.com/images/marker-icon-red.png'
    }
  });
  var redIcon = new RedIcon();

  $.getJSON('data/data.geojson', function(data) {

    var pu;

    var geojsonLayer = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        pu = layer.bindPopup(feature.properties.name);

        if (feature.properties.current == true){
          pu.setIcon(redIcon);
          current_place = pu;
        }

        //marker.bindPopup("<b>" + obj.name + "</b><br>" + obj.description + "<br>" + moment(obj.timestamp).fromNow());
      }
    }).addTo(map);

    map.fitBounds(geojsonLayer.getBounds());

    current_place.openPopup();
  });

});
