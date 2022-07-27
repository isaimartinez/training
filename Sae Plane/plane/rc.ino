void INT_Throttle() {
  if (digitalRead(pin_INT_Throttle) == HIGH)Throttle_HIGH_us = micros();
  if (digitalRead(pin_INT_Throttle) == LOW) RC_Throttle_raw  = micros() - Throttle_HIGH_us;
}

void INT_Pitch() {
  if (digitalRead(pin_INT_Pitch) == HIGH)Pitch_HIGH_us = micros();
  if (digitalRead(pin_INT_Pitch) == LOW) RC_Pitch_raw  = micros() - Pitch_HIGH_us;
}

void INT_Roll() {
  if (digitalRead(pin_INT_Roll) == HIGH)Pitch_Roll_us = micros();
  if (digitalRead(pin_INT_Roll) == LOW) RC_Roll_raw   = micros() - Pitch_Roll_us;
}

void INT_Yaw() {
  if (digitalRead(pin_INT_Yaw) == HIGH)Pitch_Yaw_us = micros();
  if (digitalRead(pin_INT_Yaw) == LOW) RC_Yaw_raw   = micros() - Pitch_Yaw_us;
}

void initRC() {
  // MandoRC: declaración de interrupciones
  pinMode(pin_INT_Yaw, INPUT_PULLUP);                
  enableInterrupt(pin_INT_Yaw, INT_Yaw, CHANGE);
  pinMode(pin_INT_Throttle, INPUT_PULLUP);           
  enableInterrupt(pin_INT_Throttle, INT_Throttle, CHANGE);
  pinMode(pin_INT_Pitch, INPUT_PULLUP);              
  enableInterrupt(12, INT_Pitch, CHANGE);
  pinMode(pin_INT_Roll, INPUT_PULLUP);                 
  enableInterrupt(pin_INT_Roll, INT_Roll, CHANGE);
}


void processRC() {
  RC_Throttle_filt = RC_Throttle_filt * 0.9 + RC_Throttle_raw * 0.1;
  RC_Pitch_filt    = RC_Pitch_filt * 0.9 + RC_Pitch_raw * 0.1;
  RC_Roll_filt     = RC_Roll_filt  * 0.9 + RC_Roll_raw  * 0.1;
  RC_Yaw_filt      = RC_Yaw_filt   * 0.9 + RC_Yaw_raw   * 0.1;

  RC_Throttle_consigna = map(RC_Throttle_filt, us_min_Throttle_raw, us_max_Throttle_raw, us_min_Throttle_adj, us_max_Throttle_adj);
  RC_Pitch_consigna    = map(RC_Pitch_filt, us_min_Pitch_raw, us_max_Pitch_raw, us_min_Pitch_adj, us_max_Pitch_adj);
  RC_Roll_consigna     = map(RC_Roll_filt, us_min_Roll_raw, us_max_Roll_raw, us_min_Roll_adj, us_max_Roll_adj);
  RC_Yaw_consigna      = map(RC_Yaw_filt, us_min_Yaw_raw, us_max_Yaw_raw, us_min_Yaw_adj, us_max_Yaw_adj);

  // Si las lecturas son cercanas a 0, las forzamos a 0 para evitar inclinar el avion por error
  if (RC_Pitch_consigna < 3 && RC_Pitch_consigna > -3)RC_Pitch_consigna = 0;
  if (RC_Roll_consigna  < 3 && RC_Roll_consigna  > -3)RC_Roll_consigna  = 0;
  if (RC_Yaw_consigna   < 3 && RC_Yaw_consigna   > -3)RC_Yaw_consigna   = 0;
}
