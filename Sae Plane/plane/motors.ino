void processRC();
void initMotors() {
  Serial.println("Init Motors");

  pinMode(MOTOR_PIN, OUTPUT);  //Motor Central
  
  digitalWrite(MOTOR_PIN, LOW);
}

void modulador() {
  pwrM = RC_Throttle_consigna;
  // servos alas
}


void PWM() {
  digitalWrite(MOTOR_PIN, HIGH);
  tiempo_motores_start = micros();
  
  // ------------------ ¡¡1ms max!! ------------------
  processRC();
  
  // ------------------ ¡¡1ms max!! ------------------
  while (digitalRead(MOTOR_PIN) == HIGH) {
    if (tiempo_motores_start + pwrM <= micros()) digitalWrite(MOTOR_PIN, LOW);
  }
}
