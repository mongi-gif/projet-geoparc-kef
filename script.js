// Création de la carte

const map = L.map('map').setView([36.18,8.71],9);

// Fond OpenStreetMap

L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

{

attribution:'© OpenStreetMap'

}

).addTo(map);


// Marqueur provisoire

L.marker([36.18,8.71])

.addTo(map)

.bindPopup("<b>Le Kef</b><br>Projet Géoparc")

.openPopup();

setTimeout(() => {
    map.invalidateSize();
}, 300);
