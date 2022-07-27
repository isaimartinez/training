void procesar();
void initMotors() {
  Serial.println("Init Motors");

  pinMode(MOTOR_PINTR, OUTPUT);  //Motor 1
  pinMode(MOTOR_PINTL, OUTPUT);  //Motor 2
  pinMode(MOTOR_PINBL, OUTPUT);  //Motor 3
  pinMode(MOTOR_PINBR, OUTPUT);  //Motor 4
  
  digitalWrite(MOTOR_PINTR, LOW);
  digitalWrite(MOTOR_PINTL, LOW);
  digitalWrite(MOTOR_PINBL, LOW);
  digitalWrite(MOTOR_PINBR, LOW);
}

void motors(){
  digitalWrite(MOTOR_PINTR, HIGH);
  digitalWrite(MOTOR_PINTL, HIGH);
  digitalWrite(MOTOR_PINBL, HIGH);
  digitalWrite(MOTOR_PINBR, HIGH);
  tiempo_motores_start2 = micros();
  
  while (digitalRead(MOTOR_PINTR) == HIGH || digitalRead(MOTOR_PINTL) == HIGH || digitalRead(MOTOR_PINBL) == HIGH || digitalRead(MOTOR_PINBR) == HIGH) {
    if (tiempo_motores_start2 + pwrTR <= micros()) digitalWrite(MOTOR_PINTR, LOW);
    if (tiempo_motores_start2 + pwrTL <= micros()) digitalWrite(MOTOR_PINTL, LOW);
    if (tiempo_motores_start2 + pwrBL <= micros()) digitalWrite(MOTOR_PINBL, LOW);
    if (tiempo_motores_start2 + pwrBR <= micros()) digitalWrite(MOTOR_PINBR, LOW);
  }
}

void PWM() {
  digitalWrite(MOTOR_PINTR, HIGH);
  digitalWrite(MOTOR_PINTL, HIGH);
  digitalWrite(MOTOR_PINBL, HIGH);
  digitalWrite(MOTOR_PINBR, HIGH);
  tiempo_motores_start = micros();
  
  // ------------------ ¡¡1ms max!! ------------------
  tiempo_1 = micros();

  procesar();
  
  tiempo_2 = micros();
  // ------------------ ¡¡1ms max!! ------------------
  while (digitalRead(MOTOR_PINTR) == HIGH || digitalRead(MOTOR_PINTL) == HIGH || digitalRead(MOTOR_PINBL) == HIGH || digitalRead(MOTOR_PINBR) == HIGH) {
    if (tiempo_motores_start + pwrTR <= micros()) digitalWrite(MOTOR_PINTR, LOW);
    if (tiempo_motores_start + pwrTL <= micros()) digitalWrite(MOTOR_PINTL, LOW);
    if (tiempo_motores_start + pwrBL <= micros()) digitalWrite(MOTOR_PINBL, LOW);
    if (tiempo_motores_start + pwrBR <= micros()) digitalWrite(MOTOR_PINBR, LOW);
  }
}

void procesar() {
  // Mapeo de señales del mando RC
  RC_Throttle_consigna = map(wifiValue[THR], us_min_Throttle_raw, us_max_Throttle_raw, us_min_Throttle_adj, us_max_Throttle_adj);
  RC_Pitch_consigna    = map(wifiValue[PIT], us_min_Pitch_raw, us_max_Pitch_raw, us_min_Pitch_adj, us_max_Pitch_adj);
  RC_Roll_consigna     = map(wifiValue[ROL], us_min_Roll_raw, us_max_Roll_raw, us_min_Roll_adj, us_max_Roll_adj);
  RC_Yaw_consigna      = map(wifiValue[RUD], us_min_Yaw_raw, us_max_Yaw_raw, us_min_Yaw_adj, us_max_Yaw_adj);

  // Si las lecturas son cercanas a 0, las forzamos a 0 para evitar inclinar el drone por error
  if (RC_Pitch_consigna < 3 && RC_Pitch_consigna > -3)RC_Pitch_consigna = 0;
  if (RC_Roll_consigna  < 3 && RC_Roll_consigna  > -3)RC_Roll_consigna  = 0;
  if (RC_Yaw_consigna   < 3 && RC_Yaw_consigna   > -3)RC_Yaw_consigna   = 0;
}

void writeServo(){
  motorTR.writeMicroseconds(pwrTR);
  motorTL.writeMicroseconds(pwrTL);
  motorBL.writeMicroseconds(pwrBL);
  motorBR.writeMicroseconds(pwrBR); 
}
void modulator(){
  
  // Si el Throttle es menos a 1300us, el control de estabilidad se desactiva. La parte integral
  // de los controladores PID se fuerza a 0.
  if (RC_Throttle_consigna <= 1600) {
    PID_W_Pitch_I = 0;
    PID_W_Roll_I = 0;
    PID_W_Yaw_I  = 0;
    PID_ang_Pitch_I = 0;
    PID_ang_Roll_I = 0;

    pwrTR = RC_Throttle_consigna;
    pwrTL = RC_Throttle_consigna;
    pwrBL = RC_Throttle_consigna;
    pwrBR = RC_Throttle_consigna;

    // Si lo motores giran con el stick de Throttle al mínimo, recudir el valor de 950us
    if (pwrTR < 1000) pwrTR = 950;
    if (pwrTL < 1000) pwrTL = 950;
    if (pwrBL < 1000) pwrBL = 950;
    if (pwrBR < 1000) pwrBR = 950;
  }

  // Si el throttle es mayor a 1300us, el control de estabilidad se activa.
  else {
    // Limitar throttle a 1800 para dejar margen a los PID
    if (RC_Throttle_consigna > 1850)RC_Throttle_consigna = 1850;

    // Modulador
    pwrTR = RC_Throttle_consigna + PID_W_Pitch_OUT - PID_W_Roll_OUT - PID_W_Yaw_OUT; // Motor 1
    pwrTL = RC_Throttle_consigna + PID_W_Pitch_OUT + PID_W_Roll_OUT + PID_W_Yaw_OUT; // Motor 2
    pwrBL = RC_Throttle_consigna - PID_W_Pitch_OUT + PID_W_Roll_OUT - PID_W_Yaw_OUT; // Motor 3
    pwrBR = RC_Throttle_consigna - PID_W_Pitch_OUT - PID_W_Roll_OUT + PID_W_Yaw_OUT; // Motor 4
    //    ESC1_us = RC_Throttle_filt; // Solo para testeos
    //    ESC2_us = RC_Throttle_filt;
    //    ESC3_us = RC_Throttle_filt;
    //    ESC4_us = RC_Throttle_filt;

    // Evitamos que alguno de los motores de detenga completamente en pleno vuelo
    if (pwrTR < 1225) pwrTR = 1225;
    if (pwrTL < 1225) pwrTL = 1225;
    if (pwrBL < 1225) pwrBL = 1225;
    if (pwrBR < 1225) pwrBR = 1225;
    // Evitamos mandar consignas mayores a 2000us a los motores
    if (pwrTR > 2000) pwrTR = 2000;
    if (pwrTL > 2000) pwrTL = 2000;
    if (pwrBL > 2000) pwrBL = 2000;
    if (pwrBR > 2000) pwrBR = 2000;
  }
}
