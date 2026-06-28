window.onload = function() {
    // 1. Initialisation de la carte en mode local (Simple)
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 2
    });

    // Définition de la grille de la carte [Y, X]
    var bornesCarte = [[0, 0], [600, 800]];

    // 2. Dessin du fond de carte
    L.rectangle(bornesCarte, {
        color: "#cbd5e1",
        weight: 2,
        fillColor: "#f8fafc",
        fillOpacity: 1
    }).addTo(map);

    // Ajustement instantané de la vue sur l'espace défini
    map.fitBounds(bornesCarte);

    // FIX ULTIME : Force la carte à se recalculer en boucle pour annuler l'effet du bug de l'URL (#contact)
    var compteurRepetitions = 0;
    var intervalleSecurite = setInterval(function() {
        map.invalidateSize();
        compteurRepetitions++;
        if (compteurRepetitions > 5) {
            clearInterval(intervalleSecurite);
        }
    }, 500);

    // 3. Création des calques pour ranger nos sites
    var geoLayer = L.layerGroup().addTo(map);
    var histLayer = L.layerGroup().addTo(map);
    var natLayer = L.layerGroup().addTo(map);
    var ethnLayer = L.layerGroup().addTo(map);
    var gastroLayer = L.layerGroup().addTo(map);

    // 4. Fonction pour fabriquer un point sur la carte avec affichage au survol
    function ajouterSite(layer, x, y, nom, description, imageUrl) {
        var htmlContent = `
            <div class="custom-popup-content">
                <h3 style="margin:0 0 5px 0; color:#004d26; font-size:1.1rem; font-weight:bold;">${nom}</h3>
                <p style="margin:0; color:#4b5563; font-size:0.85rem; line-height:1.4;">${description}</p>
                <img src="${imageUrl}" alt="${nom}" style="width:100%; height:120px; object-fit:cover; border-radius:6px; margin-top:8px; display:block;">
            </div>
        `;
        
        var marker = L.marker([y, x]).bindPopup(htmlContent);
        
        // Comportement au survol de la souris
        marker.on('mouseover', function () { this.openPopup(); });
        marker.on('mouseout', function () { this.closePopup(); });

        marker.addTo(layer);
    }

    // 5. Enregistrement des richesses du Kef sur la carte locale
    ajouterSite(geoLayer, 200, 450, "Table de Jugurtha", "Célèbre mesa géologique fortifiée s'élevant au-dessus des plaines.", "https://unsplash.com");
    ajouterSite(geoLayer, 150, 320, "Stratotype du Kef", "Limite géologique majeure marquant l'extinction des dinosaures.", "https://unsplash.com");
    ajouterSite(histLayer, 400, 380, "La Kasbah du Kef", "Forteresse militaire historique offrant un panorama complet sur la ville.", "https://unsplash.com");
    ajouterSite(natLayer, 600, 200, "Forêt d'Oued Mellègue", "Écosystème forestier riche idéal pour l'écotourisme et la randonnée.", "https://unsplash.com");
    ajouterSite(ethnLayer, 420, 350, "Musée Populaire", "Collection d'artisanat et d'objets retraçant la vie nomade et sédentaire.", "https://unsplash.com");
    ajouterSite(gastroLayer, 480, 290, "Borzgane du Kef", "Couscous traditionnel raffiné préparé lors de la fête du printemps.", "https://unsplash.com");

    // 6. Création du panneau de contrôle (les lignes de sélection horizontales)
    var filtresPatrimoine = {
        "🪨 Patrimoine Géologique": geoLayer,
        "🏛️ Patrimoine Historique": histLayer,
        "🌳 Patrimoine Naturel": natLayer,
        "🎨 Patrimoine Ethnologique": ethnLayer,
        "🍲 Patrimoine Gastronomique": gastroLayer
    };

    // Affichage du panneau de contrôle en haut à droite
    L.control.layers(null, filtresPatrimoine, { collapsed: false }).addTo(map);
};
