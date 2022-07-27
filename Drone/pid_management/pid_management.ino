#include <Preferences.h>
Preferences preferences;

// ===== Bt =====
#include "BluetoothSerial.h"
#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif
BluetoothSerial BT; // Objeto Bluetooth


#define LED 5

float Roll_ang_Kp, Roll_ang_Ki, Roll_ang_Kd;
float Pitch_ang_Kp = 0.25, Pitch_ang_Ki = 0.025, Pitch_ang_Kd = 5;
float Pitch_W_Kp   = 1,   Pitch_W_Ki   = 0.01, Pitch_W_Kd   = 0.01;
float Roll_W_Kp    = 0.5,   Roll_W_Ki    = 0.01, Roll_W_Kd    = 0.01;
float Yaw_W_Kp     = 0.25,   Yaw_W_Ki     = 0.025, Yaw_W_Kd     = 0.05;


String raRaw, paRaw, pwRaw, rwRaw, ywRaw;

void initPref();
void initBl();

void setup() {
  Serial.begin(9600);
  delay(1500);
  Serial.println("Turning On");
  initBl();
  initPref();
  
}

void loop() {
  // put your main code here, to run repeatedly:

}
