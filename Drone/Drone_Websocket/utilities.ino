void startBlinking(){
    Serial.println("blink");
    for (int i = 0; i <= 10; i++) {
      digitalWrite(LED, HIGH);
      delay(100);
      digitalWrite(LED, LOW);
      delay(100);
    }
}

void onBtnPressed(){
  buttonState = digitalRead(buttonPin);
  if (buttonState == LOW) {
    connecting = false;
    Serial.println("pressed");
    startBlinking();
    stopWiFi();
    initBle();
  } 
}

// ============= PREF =============

void initPref(){
  preferences.begin("credentials", false);
 
  ssid = preferences.getString("ssid", ""); 
  password = preferences.getString("password", "");

  Serial.print("Pass: ");
  Serial.println(password);
  Serial.print("ssid: ");
  Serial.println(ssid);
  
  if (ssid == "" || password == ""){
    Serial.println("No values saved for ssid or password");
    initBle();
  }
  else {
    // Connect to Wi-Fi
    initWiFi();
  }
}

void saveData(const char* s, const char* p ){
  preferences.begin("credentials", false);
  preferences.putString("ssid", s); 
  preferences.putString("password", p); 

  Serial.println("Network Credentials Saved using Preferences");
  preferences.end();

  initPref();
}
