const int toDegSecs = 57.2957;

void initIMU() {
  status = IMU.begin();
  if (status < 0) {
    Serial.println("IMU initialization unsuccessful");
    Serial.println("Check IMU wiring or try cycling power");
    Serial.print("Status: ");
    Serial.println(status);
    while(1) {}
  }
  status = IMU.setAccelRange(ICM20689::ACCEL_RANGE_8G);
  status = IMU.setGyroRange(ICM20689::GYRO_RANGE_500DPS);
  Serial.println("IMU successful");
}

void calibrateIMU() {
  Serial.println("Calib. IMU");
  // Calibrar giroscopio tomando 3000 muestras
  for (int cal_int = 0; cal_int < 3000 ; cal_int ++) {
    readIMU();
    gyro_X_cal += gx;
    gyro_Y_cal += gy;
    gyro_Z_cal += gz;
    acc_X_cal  += ax;
    acc_Y_cal  += ay;
    acc_Z_cal  += az;
    delayMicroseconds(20);
  }
  // Calcular el valor medio de las 3000 muestras
  gyro_X_cal = gyro_X_cal / 3000;
  gyro_Y_cal = gyro_Y_cal / 3000;
  gyro_Z_cal = gyro_Z_cal / 3000;
  acc_X_cal  = acc_X_cal  / 3000;
  acc_Y_cal  = acc_Y_cal  / 3000;
  acc_Z_cal  = acc_Z_cal  / 3000;
  accCalibOK = true;
  
}

void readIMU() {
  IMU.readSensor();
  // display the data
//  ax = IMU.getAccelX_mss();
//  ay = IMU.getAccelY_mss();

  
  ay = IMU.getAccelX_mss();
  ax = IMU.getAccelY_mss();
  
  az = IMU.getAccelZ_mss();
  temperature = IMU.getTemperature_C();
  //rad/s to deg/s

//  gx = IMU.getGyroX_rads() * toDegSecs;
//  gy = IMU.getGyroY_rads() * toDegSecs;
//  gz = IMU.getGyroZ_rads() * toDegSecs;
  
  gy = IMU.getGyroX_rads() * toDegSecs;
  gx = IMU.getGyroY_rads() * toDegSecs;
  gz = IMU.getGyroZ_rads() * toDegSecs * -1;

  // Restar valores de calibracion del acelerómetro
  if (accCalibOK == true) {
    ax -= acc_X_cal;
    ay -= acc_Y_cal;
    az -= acc_Z_cal;
    az = az - 9.8;
  }
}

void processData() {
  // Restar valores de calibración del acelerómetro y calcular
  // velocidad angular en º/s. 
  gyro_X = (gx - gyro_X_cal);
  gyro_Y = (gy - gyro_Y_cal);
  gyro_Z = (gz - gyro_Z_cal);
  tiempo_ejecucion_MPU6050 = (micros() - tiempo_MPU6050_1) / 1000;
  
  // velocidad (º/s) * tiempo (s) = grados de inclinación (º)
  angulo_pitch += gyro_X * tiempo_ejecucion_MPU6050 / 1000;
  angulo_roll  += gyro_Y * tiempo_ejecucion_MPU6050 / 1000;
  
  //angulo_pitch += angulo_roll  * sin((gz - gyro_Z_cal) * tiempo_ejecucion_MPU6050 * 0.000000266);
  //angulo_roll  -= angulo_pitch * sin((gz - gyro_Z_cal) * tiempo_ejecucion_MPU6050 * 0.000000266);
  angulo_pitch += angulo_roll  * sin((gz - gyro_Z_cal) * tiempo_ejecucion_MPU6050 * 0.0000176);
  angulo_roll  -= angulo_pitch * sin((gz - gyro_Z_cal) * tiempo_ejecucion_MPU6050 * 0.0000176);
  tiempo_MPU6050_1 = micros();
  acc_total_vector = sqrt(pow(ay, 2) + pow(ax, 2) + pow(az, 2));
  angulo_pitch_acc = asin((float)ay / acc_total_vector) * toDegSecs;
  angulo_roll_acc  = asin((float)ax / acc_total_vector) * -1* toDegSecs;

  if (set_gyro_angles) {
    // Filtro complementario
    angulo_pitch = angulo_pitch * 0.997 + angulo_pitch_acc * 0.003;   // Angulo Pitch de inclinacion
    angulo_roll  = angulo_roll  * 0.997 + angulo_roll_acc  * 0.003;   // Angulo Roll de inclinacion
   
//    angulo_pitch = angulo_pitch * 0.98 + angulo_pitch_acc * 0.02;   // Angulo Pitch de inclinacion
//    angulo_roll  = angulo_roll  * 0.98 + angulo_roll_acc  * 0.02;   // Angulo Roll de inclinacion
  }
  else {
    angulo_pitch = angulo_pitch_acc;
    angulo_roll  = angulo_roll_acc;
    set_gyro_angles = true;
  }
  
}

void saveForNextCycle(){
  angulo_pitch_ant = angulo_pitch;
  angulo_roll_ant  = angulo_roll;
  angulo_yaw_ant   = angulo_yaw;
  gyro_X_ant = gyro_X; // Pitch
  gyro_Y_ant = gyro_Y; // Roll
  gyro_Z_ant = gyro_Z; // Yaw
}
