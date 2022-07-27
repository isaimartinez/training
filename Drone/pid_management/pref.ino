void parsePid();

void initPref(){
  preferences.begin("PID", false);
 
  raRaw = preferences.getString("ra", ""); 
  paRaw = preferences.getString("pa", "");
  pwRaw = preferences.getString("pw", "");
  rwRaw = preferences.getString("rw", "");
  ywRaw = preferences.getString("yw", "");

  
  preferences.end();

  Serial.print("raRaw: ");
  Serial.println(raRaw);
  Serial.print("paRaw: ");
  Serial.println(paRaw);
  Serial.print("pwRaw: ");
  Serial.println(pwRaw);
  Serial.print("rwRaw: ");
  Serial.println(rwRaw);
  Serial.print("ywRaw: ");
  Serial.println(ywRaw);

  if(raRaw == "" || paRaw == "" || pwRaw == "" || rwRaw == "" || ywRaw == ""){
    Serial.println("=====EMPTY=====");
  } else {
    parsePid();
  }
}


void clearAllPref() {
  preferences.begin("PID", false);
  preferences.clear();
  preferences.end();
}
