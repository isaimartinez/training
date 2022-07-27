void startBlinking(){
    Serial.println("blink");
    for (int i = 0; i <= 10; i++) {
      digitalWrite(LED, HIGH);
      delay(100);
      digitalWrite(LED, LOW);
      delay(100);
    }
}
