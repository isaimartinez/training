// Set your Static IP address
IPAddress local_IP(10, 77, 210, 1);
// Set your Gateway IP address
IPAddress gateway(10, 77, 0, 1);
IPAddress subnet(255, 255, 0, 0);


void staticIp(){
  if (!WiFi.config(local_IP, gateway, subnet)) {
    Serial.println("STA Failed to configure");
  }
}

void initWiFi() {
  staticIp();
  Serial.print("WIFI status = ");
  Serial.println(WiFi.getMode());
  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(1000);
  Serial.print("WIFI status = ");
  Serial.println(WiFi.getMode());
  WiFi.disconnect();
  connecting = true;
  WiFi.begin(ssid.c_str(), password.c_str());
  Serial.println("IP");
  Serial.print(WiFi.localIP());
  Serial.print("Connecting to WiFi ..");

  while (WiFi.status() != WL_CONNECTED && connecting == true) {
    Serial.print('.');
    Serial.print(WiFi.status());
    digitalWrite(led, LOW);
    onBtnPressed();
    delay(500);
  }
  
  if(connecting == true) {
    Serial.println("Connected, IP");
    digitalWrite(led, HIGH);
    Serial.println(WiFi.localIP());
  }
}

void stopWiFi(){
  Serial.print("WIFI status = ");
  Serial.println(WiFi.getMode());
  WiFi.disconnect(true);
}
