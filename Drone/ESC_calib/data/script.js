var gateway = `ws://10.77.210.1/ws`;
var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
    setSliderstoO()
}

function setSliderstoO() {
    document.getElementById("slidertl").value = "0";
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
    document.getElementById("isConnected").style.backgroundColor = "green";
}

function onClose(event) {
    console.log('Connection closed');
    document.getElementById("isConnected").style.backgroundColor = "gray";

    setTimeout(initWebSocket, 1000);
}

function updateAllPWM(){
    var val = document.getElementById("sliderAll").value;
    updateSliderVal(val,val,val,val)
    document.getElementById("slidertl").value = parseInt(val)
    document.getElementById("slidertr").value = parseInt(val)
    document.getElementById("sliderbl").value = parseInt(val)
    document.getElementById("sliderbr").value = parseInt(val)

    document.getElementById("all").innerHTML = val
    val=1000+val*10

    let str = val+","+val+","+val+","+val+"d"
    console.log(str)
   
    websocket.send(str);
}

function updateSliderVal(tl,tr,bl,br) {
    document.getElementById("tl").innerHTML = tl
    document.getElementById("tr").innerHTML = tr
    document.getElementById("bl").innerHTML = bl
    document.getElementById("br").innerHTML = br
}

function updatePWM() {
    var tl = document.getElementById("slidertl").value;
    var tr = document.getElementById("slidertr").value;
    var bl = document.getElementById("sliderbl").value;
    var br = document.getElementById("sliderbr").value;
    updateSliderVal(tl,tr,bl,br)

    tl=1000+tl*10
    tr=1000+tr*10
    bl=1000+bl*10
    br=1000+br*10

    let str = tl+","+tr+","+bl+","+br+"d"
    console.log(str)
   
    websocket.send(str);
}

function onMessage(event) {
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);

    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        document.getElementById(key).innerHTML = myObj[key];
        document.getElementById("slider"+ (i+1).toString()).value = myObj[key];
    }
}