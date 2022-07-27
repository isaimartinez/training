void initMotors() {
  Serial.println("Init Motors");

  motorTL.attach(MOTOR_PINTL);
  motorTR.attach(MOTOR_PINTR);
  motorBL.attach(MOTOR_PINBL);
  motorBR.attach(MOTOR_PINBR);
}
