var gateway = `ws://10.77.210.1/ws`;
var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    // websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
    // document.getElementById("isConnected").style.backgroundColor = "green";
}

function onClose(event) {
    console.log('Connection closed');
    // document.getElementById("isConnected").style.backgroundColor = "gray";
    setTimeout(initWebSocket, 1000);
}

function send(){
    let ROL = document.getElementById("ROL").value
    let PIT = document.getElementById("PIT").value
    let THR = document.getElementById("THR").value
    let RUD = document.getElementById("RUD").value


    let str = ROL+","+PIT+","+THR+","+RUD+"j"
    console.log("str", str)
    sendData(str)
}

function sendData(str) {
        websocket.send(str);
}