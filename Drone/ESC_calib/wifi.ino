AsyncWebServer server(80);
AsyncWebSocket ws("/ws");
// Set your Static IP address
IPAddress local_IP(10, 77, 210, 1);
// Set your Gateway IP address
IPAddress gateway(10, 77, 0, 1);
IPAddress subnet(255, 255, 0, 0);

const char* ssid = "Yeico";
const char* password = "yM1koT34m";
String message = "";

void staticIp(){
  if (!WiFi.config(local_IP, gateway, subnet)) {
    Serial.println("STA Failed to configure");
  }
}

void initWiFi() {
  pinMode(led, OUTPUT);
  Serial.print("WIFI status = ");
  Serial.println(WiFi.getMode());
  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(1000);
  Serial.print("WIFI status = ");
  Serial.println(WiFi.getMode());
  WiFi.disconnect();
  WiFi.begin(ssid, password);
  Serial.println("IP");
  Serial.print(WiFi.localIP());
  Serial.print("Connecting to WiFi ..");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    Serial.print(WiFi.status());
    digitalWrite(led, LOW);
    delay(500);
  }
  
  Serial.println("Connected, IP");
  digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
  Serial.println(WiFi.localIP());
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    message = (char*)data;
    Serial.println(message);
      pwrTL = message.substring(0, 4).toInt();
      pwrTR = message.substring(5, 9).toInt();
      pwrBL = message.substring(10,14).toInt();
      pwrBR = message.substring(15,19).toInt(); 

    Serial.print("TL");
    Serial.print(pwrTL);
    Serial.print("TR");
    Serial.print(pwrTR);
    Serial.print("BL");
    Serial.print(pwrBL);
    Serial.print("BR");
    Serial.print(pwrBR);
    Serial.println();

    
    motorTL.writeMicroseconds(pwrTL);
    motorTR.writeMicroseconds(pwrTR);
    motorBL.writeMicroseconds(pwrBL);
    motorBR.writeMicroseconds(pwrBR);

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
