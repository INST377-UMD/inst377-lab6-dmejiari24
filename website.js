function createMap() {
    var map = L.map('map').setView([38, -98], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const coordinates = [
        {lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3)},
        {lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3)},
        {lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3)}
    ];

    coordinates.forEach(async (coord, index) => {
        const marker = L.marker([coord.lat, coord.lon]).addTo(map);
        
        // Display latitude and longitude in HTML
        document.getElementById(`lat${index + 1}`).innerText = coord.lat;
        document.getElementById(`lon${index + 1}`).innerText = coord.lon;

        // Fetch locality data and display it
        const locality = await getLocality(coord.lat, coord.lon);
        document.getElementById(`loc${index + 1}`).innerText = locality;
    });
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

async function getLocality(latitude, longitude) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || "Locality not found";
}

window.onload = createMap;
