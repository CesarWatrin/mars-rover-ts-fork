const ws = new WebSocket("ws://localhost:8080");

ws.onerror = function (error) {
    console.error("WebSocket error:", error);
};

ws.onopen = function () {
    console.log("Connection established");
    ws.send("init");
};

ws.onmessage = function (event) {
    console.log("Received:", event.data);
    document.getElementById("rover").innerHTML = event.data;
};

window.addEventListener("keydown", function () {
    console.log("Key down");
});

// Function for avancer
function avancer() {
    ws.send("A");
    // Your code to make the object move forward or perform any other desired action
}

// Function for reculer
function reculer() {
    ws.send("R");
    // Your code to make the object move backward or perform any other desired action
}

// Function for going left
function gauche() {
    ws.send("G");
    // Your code to turn the object left or perform any other desired action
}

// Function for going right
function droite() {
    ws.send("D");
    // Your code to turn the object right or perform any other desired action
}

// Listener for keydown events
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "z":
            avancer();
            break;
        case "q":
            gauche();
            break;
        case "s":
            reculer();
            break;
        case "d":
            droite();
            break;
        default:
            break;
    }
});
