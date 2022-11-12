// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// Create a base layer that holds both map layers.
let baseMaps = {
    Streets: street,
};
  
  // Create the map object with center, zoom level and default layer.
let map = L.map('map', {
    center: [39.5, -98.5],
    zoom: 5,
    layers: [street],
});

let Earthquakes = new L.LayerGroup();

let overlays = {
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
        // f = chroma.scale(['green','orange','red']).colors(6);
        if (magnitude >= 5) {
            return '#ee0000';
          }
          if (magnitude >= 4) {
            return '#ee3400';
          }
          if (magnitude >= 3) {
            return '#ee4f00';
          }
          if (magnitude >= 2) {
            return '#ee7300';
          }
          if (magnitude >= 1) {
            return '#afee00';
          }
          else
            return '#5bee00';
        }
    }
    function getR(magnitude) {
        if (magnitude == 0) {
            return 1;
          }
        else
          return magnitude * 5;
    }
    
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: style
    }).addTo(Earthquakes);

    // First Layer: Earthquake 
   Earthquakes.addTo(map);

}); 