const char* ssid = "Yeico";
const char* password = "yM1koT34m";
String message = "";

void initWiFi() {
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
    
    rcValue[ROL] = message.substring(0, 4).toInt();
    rcValue[PIT] = message.substring(5, 9).toInt();
    rcValue[THR] = message.substring(10, 14).toInt();
    rcValue[RUD] = message.substring(15, 19).toInt();
    
    recv = true;
    armed = true;

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
}
