var gateway = `ws://10.77.210.1/ws`;
var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();

    // IZQUIERDA
    var joyRUD = document.getElementById("RUD");
    var joyTHR = document.getElementById("THR");

    var JoyL = new JoyStick('joyLDiv', {}, function(stickData) {
        let RUD = stickData.x
        let THR = stickData.y
        joyRUD.value = RUD;
        joyTHR.value = THR;
    });
    
    //DERECHA
    var joyROL = document.getElementById("ROL");
    var joyPIT = document.getElementById("PIT");

    // Create JoyStick
    var JoyR = new JoyStick('joyRDiv', {}, function(stickData) {
        let ROL = stickData.x;
        let PIT = stickData.y;
        joyROL.value = ROL;
        joyPIT.value = PIT;
    });

    setInterval(function(){ 
        let ROL = JoyR.GetX()
        let PIT = JoyR.GetY()
        let THR = JoyL.GetY()
        let RUD = JoyL.GetX()

        prepareData(ROL,PIT,THR,RUD)
    }, 500);

}

function prepareData(ROL,PIT,THR,RUD) {

    ROL = 1500+(ROL*5);
    PIT = 1500+(PIT*5);
    THR = 1500+(THR*5);
    RUD = 1500+(RUD*5);

    let str = ROL+","+PIT+","+THR+","+RUD+"j"
    console.log("str", str)
    sendData(str)
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

function sendData(str) {
        websocket.send(str);
}
