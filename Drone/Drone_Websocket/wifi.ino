AsyncWebServer server(80);
AsyncWebSocket ws("/ws");
//// Set your Static IP address
//IPAddress local_IP(10, 77, 210, 1);
//// Set your Gateway IP address
//IPAddress gateway(10, 77, 0, 1);
//IPAddress subnet(255, 255, 0, 0);

//const char* ssid = "Yeico";
//const char* password = "yM1koT34m";
String message = "";

void procesar();
void writeServo();
void PWM();
void motors();

void staticIp(){
//  if (!WiFi.config(local_IP, gateway, subnet)) {
//    Serial.println("STA Failed to configure");
//  }
}

void initWiFi() {
  pinMode(LED, OUTPUT);

  
  WiFi.softAP(ssidESP, passwordESP);

  
  // Print our IP address
  Serial.println();
  Serial.println("AP running");
  Serial.print("My IP address: ");
  Serial.println(WiFi.softAPIP());
  
  digitalWrite(LED, HIGH); 
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    message = (char*)data;
    //Serial.println(message);
    if(message == "restart") {
      ESP.restart();
    }
    identifier = message.substring(19,20);
    if(identifier == "d"){
      pwrTL = message.substring(0, 4).toInt();
      pwrTR = message.substring(5, 9).toInt();
      pwrBL = message.substring(10,14).toInt();
      pwrBR = message.substring(15,19).toInt(); 
      Serial.println(message);
    }else if(identifier == "j"){
      wifiValue[ROL] = message.substring(0, 4).toInt();
      wifiValue[PIT] = message.substring(5, 9).toInt();
      wifiValue[THR] = message.substring(10, 14).toInt();
      wifiValue[RUD] = message.substring(15, 19).toInt();
      //procesar();
    }

    flag = true;
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("WebSocket client #%u disconnected\n", client->id());
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}


void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
  // Web Server Root URL
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });
  server.serveStatic("/", SPIFFS, "/");
  // Start server
  server.begin();
}

void stopWiFi(){
  Serial.print("WIFI status = ");
  Serial.println(WiFi.getMode());
  WiFi.disconnect(true);
}
