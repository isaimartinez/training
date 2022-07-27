var gateway = `ws://10.77.210.1/ws`;
var websocket;
window.addEventListener('load', onload);

var count = 0
var myInterval;
var sending = false;
var ms = 200
function onload(e) {
    initWebSocket()
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}


function onOpen(event) {
    console.log('Connection opened');
    document.getElementById("status").textContent = "Connected"
}

function onClose(event) {
    console.log('Connection closed');
    document.getElementById("status").textContent = "Disconnected"
}

function start() {
    if(!sending) {
        myInterval = setInterval(() => {
            
        }, ms);
    }
}

function sendData(str) {
    websocket.send(str);
}
