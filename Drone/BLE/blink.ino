void startBlinking(){
    Serial.println("blink");
    for (int i = 0; i <= 10; i++) {
      digitalWrite(led, HIGH);
      delay(100);
      digitalWrite(led, LOW);
      delay(100);
    }
}
