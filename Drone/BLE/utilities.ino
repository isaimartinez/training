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
