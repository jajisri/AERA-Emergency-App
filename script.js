// =====================================================
// AERA - COMPLETE JAVASCRIPT
// =====================================================


// ===============================
// PAGE NAVIGATION
// ===============================

function showPage(pageName, button) {

    var pages = document.querySelectorAll(".page");

    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }

    var selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    var buttons = document.querySelectorAll(".nav");

    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
    }

    if (button) {
        button.classList.add("active");
    }

    // Load map again when Incident Map is opened
    if (pageName === "map") {
        loadIncidentHotspots();
        updateIncidentStatistics();
    }
}


// ===============================
// DEMO EMERGENCY
// ===============================

function demoEmergency() {

    var active = document.getElementById("active");
    var critical = document.getElementById("critical");

    if (active) {
        active.textContent = "5";
    }

    if (critical) {
        critical.textContent = "2";
    }

    alert("Demo emergency loaded successfully!");
}


// ===============================
// GPS FOR REPORT PAGE
// ===============================

function getLocation() {

    var status = document.getElementById("gpsStatus");
    var locationInput = document.getElementById("location");

    if (!navigator.geolocation) {

        status.textContent =
            "GPS is not supported by this browser.";

        return;
    }

    status.textContent =
        "Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            var latitude =
                position.coords.latitude;

            var longitude =
                position.coords.longitude;

            locationInput.value =
                latitude.toFixed(6) +
                ", " +
                longitude.toFixed(6);

            status.textContent =
                "Location detected successfully!";
        },

        function() {

            status.textContent =
                "Location permission was denied or unavailable.";
        }
    );
}


// ===============================
// GPS FOR MAP
// ===============================

function showMyLocationOnMap() {

    var mapLocation =
        document.getElementById("mapLocation");

    if (!navigator.geolocation) {

        mapLocation.textContent =
            "GPS is not supported by this browser.";

        return;
    }

    mapLocation.textContent =
        "Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            var latitude =
                position.coords.latitude;

            var longitude =
                position.coords.longitude;

            mapLocation.innerHTML =
                "<b>📍 Your Current Location</b><br>" +
                latitude.toFixed(6) +
                ", " +
                longitude.toFixed(6);
        },

        function() {

            mapLocation.textContent =
                "Location permission was denied or unavailable.";
        }
    );
}


// ===============================
// EMERGENCY ANALYSIS
// ===============================

function analyze() {

    var type =
        document.getElementById("type").value;

    var location =
        document.getElementById("location").value;

    var description =
        document.getElementById("description").value;

    var people =
        Number(document.getElementById("people").value) || 0;

    var urgency =
        document.getElementById("urgency").value;


    if (location === "") {
        location = "Unknown location";
    }

    if (description === "") {
        description = "No description provided";
    }


    var priority = urgency;

    var agencies = "Police";


    if (type === "Fire") {

        priority = "HIGH";

        agencies =
            "Fire & Rescue + Police";
    }


    if (type === "Medical Emergency") {

        priority = "HIGH";

        agencies =
            "Ambulance";
    }


    if (type === "Road Accident") {

        if (
            people >= 3 ||
            urgency === "Critical"
        ) {
            priority = "CRITICAL";
        } else {
            priority = "HIGH";
        }

        agencies =
            "Ambulance + Police + Fire & Rescue";
    }


    if (type === "Flood") {

        priority = "HIGH";

        agencies =
            "Rescue Team + Police";
    }


    if (type === "Electrical Emergency") {

        priority = "HIGH";

        agencies =
            "Electrical Response Team + Fire & Rescue";
    }


    var result =
        document.getElementById("result");


    result.style.display = "block";


    result.innerHTML =

        "<h2>🤖 Emergency Analysis</h2>" +

        "<p><b>Priority:</b> " +
        priority +
        "</p>" +

        "<p><b>Emergency:</b> " +
        type +
        "</p>" +

        "<p><b>Location:</b> " +
        location +
        "</p>" +

        "<p><b>Description:</b> " +
        description +
        "</p>" +

        "<p><b>People Affected:</b> " +
        people +
        "</p>" +

        "<p><b>Recommended Agencies:</b> " +
        agencies +
        "</p>" +

        "<p>⚠️ Move to a safe location and contact appropriate emergency responders.</p>";
}


// ===============================
// INCIDENT DATA
// ===============================

var incidents = [

    {
        icon: "🚗",
        name: "Road Accident",
        risk: "high",
        area: "Main Road",
        left: "25%",
        top: "30%"
    },

    {
        icon: "🏥",
        name: "Medical Emergency",
        risk: "medium",
        area: "City Hospital",
        left: "65%",
        top: "25%"
    },

    {
        icon: "🔥",
        name: "Building Fire",
        risk: "high",
        area: "Market Area",
        left: "75%",
        top: "65%"
    },

    {
        icon: "⚡",
        name: "Electrical Emergency",
        risk: "medium",
        area: "Industrial Area",
        left: "40%",
        top: "70%"
    }

];


// ===============================
// LOAD MAP HOTSPOTS
// ===============================

function loadIncidentHotspots() {

    var map =
        document.getElementById("incidentMap");

    if (!map) {
        return;
    }


    map.innerHTML =
        '<div class="map-title">LIVE INCIDENT VIEW</div>';


    for (var i = 0; i < incidents.length; i++) {

        var incident =
            incidents[i];

        var hotspot =
            document.createElement("div");


        hotspot.className =
            "map-hotspot " +
            incident.risk;


        hotspot.textContent =
            incident.icon;


        hotspot.style.left =
            incident.left;


        hotspot.style.top =
            incident.top;


        hotspot.title =
            incident.name +
            " - " +
            incident.risk.toUpperCase() +
            " RISK";


        hotspot.onclick =
            (function(selectedIncident) {

                return function() {

                    var mapLocation =
                        document.getElementById("mapLocation");


                    mapLocation.innerHTML =

                        "<b>" +
                        selectedIncident.icon +
                        " " +
                        selectedIncident.name +
                        "</b><br>" +

                        "📍 " +
                        selectedIncident.area +
                        "<br>" +

                        "⚠️ " +
                        selectedIncident.risk.toUpperCase() +
                        " RISK";
                };

            })(incident);


        map.appendChild(hotspot);
    }
}


// ===============================
// UPDATE MAP STATISTICS
// ===============================

function updateIncidentStatistics() {

    var totalBox =
        document.getElementById("totalIncidents");

    var highBox =
        document.getElementById("highRiskAreas");

    var mediumBox =
        document.getElementById("mediumRiskAreas");

    var hotspotBox =
        document.getElementById("topHotspot");


    var total =
        incidents.length;


    var high =
        0;

    var medium =
        0;


    var areaCount = {};


    for (var i = 0; i < incidents.length; i++) {

        var incident =
            incidents[i];


        if (incident.risk === "high") {
            high++;
        }


        if (incident.risk === "medium") {
            medium++;
        }


        if (!areaCount[incident.area]) {
            areaCount[incident.area] = 0;
        }

        areaCount[incident.area]++;
    }


    var topHotspot =
        "No data";

    var highestCount =
        0;


    for (var area in areaCount) {

        if (areaCount[area] > highestCount) {

            highestCount =
                areaCount[area];

            topHotspot =
                area;
        }
    }


    if (totalBox) {
        totalBox.textContent = total;
    }

    if (highBox) {
        highBox.textContent = high;
    }

    if (mediumBox) {
        mediumBox.textContent = medium;
    }

    if (hotspotBox) {
        hotspotBox.textContent = topHotspot;
    }
}


// ===============================
// DISPATCH
// ===============================

function assignUnit() {

    var status =
        document.getElementById("dispatchStatus");

    if (status) {

        status.textContent =
            "✅ Ambulance A2 assigned successfully!";
    }
}


// ===============================
// AI ASSISTANT
// ===============================

function sendMessage() {

    var input =
        document.getElementById("chatInput");

    var chat =
        document.getElementById("chat");


    var text =
        input.value.trim();


    if (text === "") {
        return;
    }


    chat.innerHTML +=

        "<div class='user-message'>" +
        text +
        "</div>";


    var lower =
        text.toLowerCase();


    var answer =
        "Please provide the emergency type and location.";


    if (lower.indexOf("fire") !== -1) {

        answer =
            "🔥 Possible fire emergency. Stay away from flames and smoke. Fire & Rescue and Police may be required.";
    }

    else if (lower.indexOf("accident") !== -1) {

        answer =
            "🚗 Possible road accident. Move to a safe place if possible. Ambulance, Police and Fire & Rescue may be required.";
    }

    else if (lower.indexOf("flood") !== -1) {

        answer =
            "🌊 Possible flood emergency. Move to higher ground and avoid fast-moving water.";
    }

    else if (lower.indexOf("medical") !== -1) {

        answer =
            "🚑 Possible medical emergency. Seek medical assistance immediately.";
    }

    else if (lower.indexOf("electric") !== -1) {

        answer =
            "⚡ Electrical emergency detected. Stay away from exposed wires and electrical equipment.";
    }

    else if (
        lower.indexOf("hello") !== -1 ||
        lower.indexOf("hi") !== -1
    ) {

        answer =
            "👋 Hello! I am AERA. Tell me about a sample emergency.";
    }


    chat.innerHTML +=

        "<div class='bot'>" +
        "🤖 <b>AERA:</b> " +
        answer +
        "</div>";


    input.value = "";


    chat.scrollTop =
        chat.scrollHeight;
}


// ===============================
// START APPLICATION
// ===============================

loadIncidentHotspots();

updateIncidentStatistics();


// Make Dashboard visible first

var allPages =
    document.querySelectorAll(".page");


for (var i = 0; i < allPages.length; i++) {

    allPages[i].classList.remove("active");
}


var dashboard =
    document.getElementById("dashboard");


if (dashboard) {
    dashboard.classList.add("active");
}
