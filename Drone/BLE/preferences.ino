void initBle();

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
