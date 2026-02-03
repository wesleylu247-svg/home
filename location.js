const tomtomKey = 'd9gnsEpA7LiXj1GulEZIBw4aiq2y2Uv4';

// 1. Clock Logic: Updates time every second
function updateClock() {
    const now = new Date();
    
    // Format Time (HH:MM:SS AM/PM)
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    });
    
    // Format Date (Day, Month Date)
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });

    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

document.addEventListener('DOMContentLoaded', function() {
    // Start Clock
    updateClock();
    setInterval(updateClock, 1000);

    // 2. Initialize Map (Zoomed out to level 10 for better traffic view)
    var map = L.map('map', { 
        zoomControl: false, 
        attributionControl: false 
    }).setView([34.0030, -84.1446], 9);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { 
        maxZoom: 19 
    }).addTo(map);
    
    // 3. Add Live Traffic Layer
    var trafficUrl = `https://{s}.api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${tomtomKey}`;
    L.tileLayer(trafficUrl, { 
        maxZoom: 22, 
        tileSize: 256, 
        opacity: 1.0, 
        subdomains: 'abcd' 
    }).addTo(map);
});

// Auto Refresh every 30 mins
setTimeout(() => { window.location.reload(); }, 1800000);