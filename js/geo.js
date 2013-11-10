$(document).ready(function () {
  "use strict";

  var map = L.map('map');
  var current_place;

  L.tileLayer('http://{s}.tile.cloudmade.com/a777adab7b1d454f9290d5312d97ab23/{styleId}/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    styleId: 113341
  }).addTo(map);


  var RedIcon = L.Icon.Default.extend({
    options: {
      iconUrl: 'images/marker-icon-red.png'
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
