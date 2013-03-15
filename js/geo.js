$(document).ready(function () {
  "use strict";

  var map = L.map('map');
  L.tileLayer('http://{s}.tile.cloudmade.com/a777adab7b1d454f9290d5312d97ab23/{styleId}/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    styleId: 997
  }).addTo(map);

  $.getJSON('http://data.whereisshane.com/_design/data/_view/all', function (data) {

    var bounds = new L.LatLngBounds();

    $.each(data.rows, function (key, obj) {

      bounds.extend([obj.location.lat, obj.location.lng]);

      var marker = L.marker([obj.location.lat, obj.location.lng], {
        "riseOnHover": true
      }).addTo(map);

      marker.bindPopup("<b>" + obj.name + "</b><br>" + obj.description + "<br>" + moment(obj.timestamp).fromNow());

    });

    map.fitBounds(bounds.pad(0.5));
  });
});
