const collegeCoords = {
    latitude: 48.94321,
    longitude: 24.73380
};

let map = null;
let watchId = null;

window.onload = function () {
    document.getElementById("watch").onclick = watchLocation;
    document.getElementById("clearWatch").onclick = clearWatch;
    document.getElementById("btnGoTo").onclick = goToCoordinates;
}

function watchLocation() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
    } else {
        alert("Браузер не підтримує геолокацію");
    }
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById("location").innerHTML += "<br>[Стеження зупинено]";
    }
}

function displayLocation(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    let accuracy = position.coords.accuracy;
    let timestamp = new Date(position.timestamp).toLocaleTimeString();

    let locDiv = document.getElementById("location");
    locDiv.innerHTML = `Широта: ${lat}, Довгота: ${lng} (Точність: ${accuracy}м)`;

    let km = computeDistance(position.coords, collegeCoords);
    document.getElementById("distance").innerHTML = `Відстань до коледжу: ${km.toFixed(3)} км`;

    updateMap(lat, lng, accuracy, timestamp);
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied",
        2: "Position not available",
        3: "Request timed out"
    };
    let msg = errorTypes[error.code] || "Error";
    if (error.code === 0 || error.code === 2) msg += " " + error.message;
    document.getElementById("location").innerHTML = msg;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function updateMap(lat, lng, accuracy, time) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        L.marker([collegeCoords.latitude, collegeCoords.longitude]).addTo(map)
            .bindPopup("<b>Коледж</b>");
    }

    L.marker([lat, lng]).addTo(map)
        .bindPopup(`Я тут!<br>Час: ${time}`)
        .openPopup();

    map.setView([lat, lng], 16);
}

function goToCoordinates() {
    let lat = parseFloat(document.getElementById('destLat').value);
    let lng = parseFloat(document.getElementById('destLng').value);

    if (map && lat && lng) {
        map.flyTo([lat, lng], 14);
        L.marker([lat, lng]).addTo(map).bindPopup("Пункт призначення").openPopup();
    } else {
        alert("Введіть координати або спочатку запустіть Watch me");
    }
}