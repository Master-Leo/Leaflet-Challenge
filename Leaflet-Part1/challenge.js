// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// Create a base layer that holds both map layers.
var baseMaps = {
    Streets: street,
};
  
  // Create the map object with center, zoom level and default layer.
var map = L.map('map', {
    center: [39.5, -98.5],
    zoom: 5,
    layers: [street],
});

var Earthquakes = new L.LayerGroup();

var overlays = {
    "Earthquakes": Earthquakes,
};
  
  // Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);
  
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

  // Perform a GET request to the query URL/
d3.json(queryUrl).then(function(data) {
    console.log(data);
    function style(feature){
        return {
            color: "black",
            fillColor: getFill(feature.properties.mag),
            fillOpacity: 1,
            weight: .5,
            radius: getR(feature.properties.mag)
        };
    function getFill(magnitude){
        if (magnitude >= 5) {
            return '#FF0D0D';
          }
          if (magnitude >= 4) {
            return '#FF4E11';
          }
          if (magnitude >= 3) {
            return '#FF8E15';
          }
          if (magnitude >= 2) {
            return '#FAB733';
          }
          if (magnitude >= 1) {
            return '#D3DB40';
          }
          else
            return '#69B34C'
        }
    }
    function getR(magnitude) {
        if (magnitude == 0) {
            return 1;
          }
        else
          return magnitude * 5;
    }
    function colorScale(m){
        return m >= 5 ? '#FF0D0D' :
                m >= 4 ?'#FF4E11' :
                  m >= 3 ? '#FF8E15' :
                    m >= 2 ? '#FAB733' :
                       m >= 1 ? '#D3DB40' :
                          m >= 0 ? '#69B43C': '#69B43C';
    }
    
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: style,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.title}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        },
    }).addTo(Earthquakes);

    Earthquakes.addTo(map);
 
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
            magnitude = [0, 1, 2, 3, 4, 5];
            labels = [];

        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML +=
            '<i style="background:' + colorScale(magnitude[i])+ '"></i> ' +
                magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
        }
        return div;
    };

    // Finally, displaying  color legend to the map.
    legend.addTo(map);

}); 
