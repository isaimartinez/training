void debug() {
  if(Serial.available()) {
    char ch = Serial.read();
    if (ch >= '0' && ch <='9') debugvalue = ch -'0';
    else {
      Serial.println("Display data:");
      Serial.println("0 - off");
      Serial.println("1 - Debug Val");
    }
  }
  if(debugvalue == 1) {
    Serial.print("Debug Val");
    Serial.print("\t");
    Serial.print("Debug Val");
    Serial.print("\t");
    Serial.print("Debug Val");
    Serial.print("\t");
    Serial.println();
  }
}
