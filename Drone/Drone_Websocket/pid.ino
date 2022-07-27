void PID_ang() {
  // PID ángulo - PITCH
  PID_ang_Pitch_error = RC_Pitch_consigna - angulo_pitch;                        // Error entre lectura y consigna
  PID_ang_Pitch_P  = Pitch_ang_Kp  * PID_ang_Pitch_error;                        // Parte proporcional
  PID_ang_Pitch_I += (Pitch_ang_Ki * PID_ang_Pitch_error);                       // Parte integral (sumatorio del error en el tiempo)
  //PID_ang_Pitch_I = (Pitch_ang_Ki * PID_ang_Pitch_error);  
  PID_ang_Pitch_I  = constrain(PID_ang_Pitch_I, -PID_ang_sat1, PID_ang_sat1);    // Limitar parte integral
  PID_ang_Pitch_D  = Pitch_ang_Kd * (angulo_pitch - angulo_pitch_ant);           // Parte derivativa (diferencia entre el error actual y el anterior)

  PID_ang_Pitch_OUT =  PID_ang_Pitch_P + PID_ang_Pitch_I + PID_ang_Pitch_D;      // Salida PID
  PID_ang_Pitch_OUT = constrain(PID_ang_Pitch_OUT, -PID_ang_sat2, PID_ang_sat2); // Limitar salida del PID

  // PID ángulo - ROLL
  PID_ang_Roll_error = RC_Roll_consigna - angulo_roll;                           // Error entre lectura y consigna
  PID_ang_Roll_P  = Roll_ang_Kp  * PID_ang_Roll_error;                           // Parte proporcional
  PID_ang_Roll_I += (Roll_ang_Ki * PID_ang_Roll_error);                          // Parte integral (sumatorio del error en el tiempo)
  //PID_ang_Roll_I = (Roll_ang_Ki * PID_ang_Roll_error);  
  PID_ang_Roll_I  = constrain(PID_ang_Roll_I, -PID_ang_sat1, PID_ang_sat1);      // Limitar parte integral
  PID_ang_Roll_D  = Roll_ang_Kd * (angulo_roll - angulo_roll_ant);               // Parte derivativa (diferencia entre el error actual y el anterior)

  PID_ang_Roll_OUT = PID_ang_Roll_P + PID_ang_Roll_I + PID_ang_Roll_D;           // Salida PID
  PID_ang_Roll_OUT = constrain(PID_ang_Roll_OUT, -PID_ang_sat2, PID_ang_sat2);   // Limitar salida del PID
}


// PID velocidad angular
void PID_w() {
  // En funcion del modo de vuelo que hayamos seleccionado, las consignas de los PID serán diferentes
  if (MODO_vuelo == 0) {
    // En modo acrobático solo controlamos la velocidad de cada eje (un PID por eje). La consigna del PID se da en º/s
    // y viene directamente del mando RC
    PID_W_Pitch_consigna = RC_Pitch_consigna;
    PID_W_Roll_consigna  = RC_Roll_consigna;
  }
  else {
    // En modo estable las consignas de los PID de velocidad vienen de las salidas de los PID de ángulo
    PID_W_Pitch_consigna = PID_ang_Pitch_OUT;
    PID_W_Roll_consigna  = PID_ang_Roll_OUT;
  }

  // PID velocidad - PITCH
  PID_W_Pitch_error = PID_W_Pitch_consigna - gyro_X;                       // Error entre lectura y consigna
  PID_W_Pitch_P  = Pitch_W_Kp  * PID_W_Pitch_error;                        // Parte proporcional
  
  PID_W_Pitch_I += (Pitch_W_Ki * PID_W_Pitch_error);                       // Parte integral (sumatorio del error en el tiempo)
  //PID_W_Pitch_I = (Pitch_W_Ki * PID_W_Pitch_error); 
  PID_W_Pitch_I  = constrain(PID_W_Pitch_I, -PID_W_sat1, PID_W_sat1);      // Limitar parte integral
  
  PID_W_Pitch_D  = Pitch_W_Kd * (gyro_X - gyro_X_ant);                     // Parte derivativa (diferencia entre el error actual y el anterior)

  PID_W_Pitch_OUT = PID_W_Pitch_P + PID_W_Pitch_I + PID_W_Pitch_D;         // Salida PID
  PID_W_Pitch_OUT = constrain(PID_W_Pitch_OUT, -PID_W_sat2, PID_W_sat2);   // Limitar salida del PID


  // PID velocidad - ROLL
  PID_W_Roll_error = PID_W_Roll_consigna - gyro_Y;                         // Error entre lectura y consigna
  PID_W_Roll_P  = Roll_W_Kp  * PID_W_Roll_error;                           // Parte proporcional
  
  PID_W_Roll_I += (Roll_W_Ki * PID_W_Roll_error);                          // Parte integral (sumatorio del error en el tiempo)
  //PID_W_Roll_I = (Roll_W_Ki * PID_W_Roll_error);  
  PID_W_Roll_I  = constrain(PID_W_Roll_I, -PID_W_sat1, PID_W_sat1);        // Limitar parte integral
  
  PID_W_Roll_D  = Roll_W_Kd * (gyro_Y - gyro_Y_ant);                       // Parte derivativa (diferencia entre el error actual y el anterior)

  PID_W_Roll_OUT = PID_W_Roll_P + PID_W_Roll_I + PID_W_Roll_D;             // Salida PID
  PID_W_Roll_OUT = constrain(PID_W_Roll_OUT, -PID_W_sat2, PID_W_sat2);     // Limitar salida del PID


  // PID velocidad - YAW
  PID_W_Yaw_error = RC_Yaw_consigna - gyro_Z;                              // Error entre lectura y consigna
  PID_W_Yaw_P  = Yaw_W_Kp  * PID_W_Yaw_error;                              // Parte proporcional
  PID_W_Yaw_I += (Yaw_W_Ki * PID_W_Yaw_error);                             // Parte integral (sumatorio del error en el tiempo)
  //PID_W_Yaw_I = (Yaw_W_Ki * PID_W_Yaw_error);
  PID_W_Yaw_I  = constrain(PID_W_Yaw_I, -PID_W_sat1, PID_W_sat1);          // Limitar parte integral
  
  PID_W_Yaw_D  = Yaw_W_Kd * (gyro_Z - gyro_Z_ant);                         // Parte derivativa (diferencia entre el error actual y el anterior)

  PID_W_Yaw_OUT = PID_W_Yaw_P + PID_W_Yaw_I + PID_W_Yaw_D;                 // Salida PID
  PID_W_Yaw_OUT = constrain(PID_W_Yaw_OUT, -PID_W_sat2, PID_W_sat2);       // Limitar salida del PID
}
