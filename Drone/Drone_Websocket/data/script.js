var gateway = `ws://192.168.4.1/ws`;
var websocket;
window.addEventListener('load', onload);
var armed = false
//var canSend = false
var buffer = []
var securityTurnOff
var timeRunning = false

function onload(event) {
    initWebSocket();

    // IZQUIERDA
    var joyRUD = document.getElementById("RUD");
    var joyTHR = document.getElementById("THR");

    var JoyL = new JoyStick('joyLDiv', {"autoReturnToCenter": false}, function(stickData) {
        let RUD = stickData.x
        let THR = stickData.y
        joyRUD.value = RUD;
        joyTHR.value = THR;
    });
    
    //DERECHA
    var joyROL = document.getElementById("ROL");
    var joyPIT = document.getElementById("PIT");

    // Create JoyStick
    var JoyR = new JoyStick('joyRDiv', {"autoReturnToCenter": true}, function(stickData) {
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
    }, 100);

}

function prepareData(ROL,PIT,THR,RUD) {
    if(!armed) return;
    ROL = 1500+(ROL*5);
    PIT = 1500+(PIT*5);
    THR = 1500+(THR*5);
    RUD = 1500+(RUD*5);

    let str = ROL+","+PIT+","+THR+","+RUD+"j"
    console.log("str", str)
    buffer.push(THR)
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
    document.getElementById("isConnected").style.backgroundColor = "green";
}

function onClose(event) {
    console.log('Connection closed');
    document.getElementById("isConnected").style.backgroundColor = "gray";
    setTimeout(initWebSocket, 1000);
}

function sendData(str) {
    let startedDown = buffer.filter(THR => THR == 1000);
    let stillDown = buffer[buffer.length-1] == 1000 ? true : false;
    if(stillDown && !timeRunning) {
        timeRunning = true
        console.log("Starting Time")
        securityTurnOff = setTimeout(() => {
            onDisarmed()
        }, 5000);
    } else if(!stillDown && timeRunning){
        clearTimeout(securityTurnOff);
        timeRunning = false
    }

    if(startedDown.length > 0) {
        websocket.send(str);
    }
}

function reset() {
    let str = "restart"
    console.log(str)
   
    websocket.send(str);
}

function onCheckBox() {
    var checkBox = document.getElementById("myCheck");
    var isArmed = document.getElementById("isArmed");
    if (checkBox.checked == true){
        armed = true
        isArmed.innerHTML = "true"
    } else {
        onDisarmed()
    }
}

function onDisarmed() {
    var checkBox = document.getElementById("myCheck");
    var isArmed = document.getElementById("isArmed");

    console.log("Disarming")
    armed = false
    checkBox.checked = false
    isArmed.innerHTML ="false"
    let str = "1500,1500,1000,1500j"
    console.log("str", str)
    websocket.send(str);
    buffer = []
    timeRunning = false

}