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
  
  // Pass our map layers into our layers control and add the layers control to the map.
  L.control.layers(baseMaps).addTo(map);
  
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
  // Perform a GET request to the query URL/
d3.json(queryUrl).then(function(data) {
    console.log(data);
    function style(feature){
        return {
            color: "green",
            fillColor: getFill(feature.properties.mag),
            fillOpacity: 0.75,
            stroke: true,
            weight: 0.5,
            radius: getRadius(feature.properties.mag)
        };
    function getFill(magnitude){
        return {

        }
    }
}
    
    // Once we get a response, send the data.features object to the createFeatures function.
    L.geoJson(data)
    .addTo(map);
    });




  