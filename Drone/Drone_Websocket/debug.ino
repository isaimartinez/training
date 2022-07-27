void debug() {
  if(Serial.available()) {
    char ch = Serial.read();
    if (ch >= '0' && ch <='9') debugvalue = ch -'0';
    else {
//      Serial.println("A - acc calib");
//      Serial.println("D - write default PID");
//      Serial.println("R - read actual PID");
//      Serial.println("WS - Store PID in EEPROM");
      Serial.println("Display data:");
      Serial.println("0 - off");
      Serial.println("1 - Gx Gy Gz d/s");
      Serial.println("2 - Gyro Values");
      Serial.println("3 - Acc values mss");
      Serial.println("4 - Mando values");
      Serial.println("5 - Motor values");
      Serial.println("6 - Consignas");
      Serial.println("7 - Ang inclinacion");
      Serial.println("8 - PID calculated");
      Serial.println("9 - PID_ang_Pitch_OUT");

      
      
    }
  }
  if(debugvalue == 1) {
    Serial.print(gx,6);
    Serial.print("\t");
    Serial.print(gy,6);
    Serial.print("\t");
    Serial.print(gz,6);
    Serial.print("\t");
    Serial.println();
  }
  else if(debugvalue == 2) {
    Serial.print(gyro_X,6);
    Serial.print("\t");
    Serial.print(gyro_Y,6);
    Serial.print("\t");
    Serial.print(gyro_Z,6);
    Serial.print("\t");
    Serial.println();
  }
  else if(debugvalue == 3) {
    Serial.print(ax,6);
    Serial.print("\t");
    Serial.print(ay,6);
    Serial.print("\t");
    Serial.print(az,6);
    Serial.print("\t");
    Serial.println();
  }
  else if(debugvalue == 4) {
    Serial.print("ROL");
    Serial.print(wifiValue[ROL]);
    Serial.print("PIT");
    Serial.print( wifiValue[PIT]);
    Serial.print("THR");
    Serial.print(wifiValue[THR]);
    Serial.print("RUD");
    Serial.print(wifiValue[RUD]);
    Serial.println();    
  }
  else if(debugvalue == 5) {
    Serial.print("pwrTL");
    Serial.print(pwrTL);
    Serial.print("pwrTR");
    Serial.print(pwrTR);
    Serial.print("pwrBL");
    Serial.print(pwrBL);
    Serial.print("pwrBR");
    Serial.print(pwrBR);
    Serial.println();    
  }
  else if(debugvalue == 6) {
    Serial.print("Throttle");
    Serial.print(RC_Throttle_consigna);
    Serial.print("\t");
    Serial.print("Pitch");
    Serial.print(PID_W_Pitch_consigna);
    Serial.print("\t");
    Serial.print("Roll");
    Serial.print(PID_W_Roll_consigna);
    Serial.print("\t");
    Serial.print("Yaw");
    Serial.print(RC_Yaw_consigna);
    Serial.print("\t");
    Serial.println();
  }
  else if(debugvalue == 7) {
    Serial.print("angulo_pitch");
    Serial.print(angulo_pitch);
    Serial.print("angulo_roll");
    Serial.print(angulo_roll);
    Serial.print("angulo_pitch_acc");
    Serial.print(angulo_pitch_acc);
    Serial.print("angulo_roll_acc");
    Serial.print(angulo_roll_acc);
    Serial.print("tiempo_ejecucion");
    Serial.print(tiempo_ejecucion_MPU6050);
    Serial.println();    
  }else if(debugvalue == 8) {
    Serial.print("RC_Throttle_consigna");
    Serial.print(RC_Throttle_consigna);
    Serial.print("PID_W_Pitch_OUT");
    Serial.print(PID_W_Pitch_OUT);
    Serial.print("PID_W_Roll_OUT");
    Serial.print(PID_W_Roll_OUT);
    Serial.print("PID_W_Yaw_OUT");
    Serial.print(PID_W_Yaw_OUT);    
    Serial.println();    
  } else if(debugvalue == 9) {
    Serial.print("PID_ang_Pitch_P");
    Serial.print(PID_ang_Pitch_P);
    Serial.print("PID_ang_Pitch_I");
    Serial.print(PID_ang_Pitch_I);
    Serial.print("PID_ang_Pitch_D");
    Serial.print(PID_ang_Pitch_D);   
    Serial.println();
    
  }
}
