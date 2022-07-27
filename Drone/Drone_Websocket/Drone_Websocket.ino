#include <WiFi.h>
#include <Servo.h>
#include <Wire.h>
#include <EEPROM.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "SPIFFS.h"
#include <Arduino_JSON.h>
#include "ICM20689.h"
// ===== BLE =====
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#define SERVICE_UUID        "6fb23cbc-e39a-11ec-8fea-0242ac120002"
#define CHARACTERISTIC_UUID "6fb23f1e-e39a-11ec-8fea-0242ac120002"

#include <Preferences.h>
ICM20689 IMU(Wire,0x68);
int status;

#define MAX_SIGNAL 2000
#define MIN_SIGNAL 1000
#define MOTOR_PINTL 26 //TL
#define MOTOR_PINTR 33 //TR
#define MOTOR_PINBL 25 //BL
#define MOTOR_PINBR 32 //BR

#define LED 5
const int buttonPin = 0; 
int buttonState = 0;
bool connecting = false;

Preferences preferences;

String ssid;
String password;


const char *ssidESP = "ESP32-DRONE";
const char *passwordESP =  "123456789";

#define usCiclo 6000 

bool flag = false;
int pwrTL = 1000; //tl
int pwrTR = 1000; //tr
int pwrBL = 1000; //bl
int pwrBR = 1000; //br
String identifier;

int16_t wifiValue[6];

Servo motorTL;
Servo motorTR;
Servo motorBL;
Servo motorBR;

#define ROL 0
#define PIT 1
#define THR 2
#define RUD 3


bool MODO_vuelo = 1;   // 0: Modo acrobatico, 1: Modo estable (por defecto MODO_vuelo = 1)
// AJUSTE DE PIDs
// Modificar estos parámetros apara ajustar los PID
float Roll_ang_Kp  = 0.25, Roll_ang_Ki  = 0.02, Roll_ang_Kd  = 2;
float Pitch_ang_Kp = 0.25, Pitch_ang_Ki = 0.02, Pitch_ang_Kd = 4;
float Pitch_W_Kp   = 0.6,   Pitch_W_Ki   = 0.03, Pitch_W_Kd   = 0.03;
float Roll_W_Kp    = 0.6,   Roll_W_Ki    = 0.03, Roll_W_Kd    = 0.03;
float Yaw_W_Kp     = 0.25,   Yaw_W_Ki     = 0.025, Yaw_W_Kd     = 0.05;

//float Roll_ang_Kp  = 0.5, Roll_ang_Ki  = 0.01, Roll_ang_Kd  = 10;
//float Pitch_ang_Kp = 0.5, Pitch_ang_Ki = 0.01, Pitch_ang_Kd = 10;
//float Pitch_W_Kp   = 2,   Pitch_W_Ki   = 0.02, Pitch_W_Kd   = 0;
//float Roll_W_Kp    = 2,   Roll_W_Ki    = 0.02, Roll_W_Kd    = 0;
//float Yaw_W_Kp     = 1,   Yaw_W_Ki     = 0.05, Yaw_W_Kd     = 0;

//int PID_W_sat1   = 380;  // Limitar parte integral PID velocidad
//int PID_W_sat2   = 380;  // Limitar salida del PID velocidad
//int PID_ang_sat1 = 130;  // Limitar parte integral PID ángulo
//int PID_ang_sat2 = 130;  // Limitar salida del PID ángulo
int PID_W_sat1   = 190;  // Limitar parte integral PID velocidad
int PID_W_sat2   = 190;  // Limitar salida del PID velocidad
int PID_ang_sat1 = 65;  // Limitar parte integral PID ángulo
int PID_ang_sat2 = 65;  // Limitar salida del PID ángulo


float PID_ang_Pitch_error, PID_ang_Pitch_P, PID_ang_Pitch_I, PID_ang_Pitch_D, PID_ang_Pitch_OUT;
float PID_ang_Roll_error, PID_ang_Roll_P, PID_ang_Roll_I, PID_ang_Roll_D, PID_ang_Roll_OUT;
float PID_ang_Yaw_error, PID_ang_Yaw_P, PID_ang_Yaw_I, PID_ang_Yaw_D, PID_ang_Yaw_OUT;
float PID_W_Pitch_error, PID_W_Pitch_P, PID_W_Pitch_I, PID_W_Pitch_D, PID_W_Pitch_OUT;
float PID_W_Roll_error, PID_W_Roll_P, PID_W_Roll_I, PID_W_Roll_D, PID_W_Roll_OUT;
float PID_W_Yaw_error, PID_W_Yaw_P, PID_W_Yaw_I, PID_W_Yaw_D, PID_W_Yaw_OUT;
float PID_W_Pitch_consigna, PID_W_Roll_consigna;

// AJUSTE MANDO THROTLLE
const int us_max_Throttle_adj = 1900;
const int us_min_Throttle_adj = 970;
const float us_max_Throttle_raw = 2004;  // <-- Si la entrada Throttle está invertida sustituir este valor
const float us_min_Throttle_raw = 1116;  // <-- por este y viceversa

// AJUSTE MANDO PITCH
const float us_max_Pitch_raw = 1952;
const float us_min_Pitch_raw = 992;
const int us_max_Pitch_adj = -30;  // <-- Si la entrada Pitch está invertida sustituir este valor
const int us_min_Pitch_adj = 30;   // <-- por este y viceversa

// AJUSTE MANDO ROLL
const float us_max_Roll_raw = 1960;
const float us_min_Roll_raw = 992;
const int us_max_Roll_adj = 30;    // <-- Si la entrada Roll está invertida sustituir este valor
const int us_min_Roll_adj = -30;   // <-- por este y viceversa

// AJUSTE MANDO YAW
const float us_max_Yaw_raw = 1960;
const float us_min_Yaw_raw = 992;
const int us_max_Yaw_adj = 30;     // <-- Si la entrada Yaw está invertida sustituir este valor
const int us_min_Yaw_adj = -30;    // <-- por este y viceversa

float RC_Throttle_consigna, RC_Pitch_consigna, RC_Roll_consigna, RC_Yaw_consigna;

// IMU
float angulo_pitch, angulo_roll, angulo_yaw, angulo_pitch_acc, angulo_roll_acc, temperature;
float angulo_pitch_ant, angulo_roll_ant, angulo_yaw_ant;
float gx, gy, gz, gyro_Z, gyro_X, gyro_Y, gyro_X_ant, gyro_Y_ant, gyro_Z_ant;
float gyro_X_cal, gyro_Y_cal, gyro_Z_cal;
float ax, ay, az, acc_X_cal, acc_Y_cal, acc_Z_cal, acc_total_vector;
bool set_gyro_angles, accCalibOK = false;
float tiempo_ejecucion_MPU6050, tiempo_MPU6050_1;

// TIEMPOS
long loop_timer, loop_timer1, tiempo_motores_start, tiempo_motores_start2, tiempo_ON, tiempo_1, tiempo_2;

// DEBUG
int debugvalue = 0;

//==============================
// Initialize SPIFFS
void initFS();
// ========= IMU =========
void initIMU();
void saveForNextCycle();
void calibrateIMU();
void readIMU();
void processData();
// ========= WiFi =========
void initWiFi();
void initWebSocket();
void staticIp();
// ========= Motors =========
void initMotors();
void PWM();
void motors();
//=========== BLE ===========
void onBtnPressed();


void setup() {
  Serial.begin(9600);
  Serial.println("Program begin...");
  pinMode(buttonPin, INPUT);
  // Configures static IP address
  //staticIp();
  initFS();
  //initPref();
  initWiFi();
  initWebSocket();
  initIMU();
  calibrateIMU();
  delay(1500);
  initMotors();
  if (MODO_vuelo == 1) Serial.println("-MODO Estable-");
  else Serial.println("-MODO Acro-");
  loop_timer = micros();
}

void loop() {
    while (micros() - loop_timer < usCiclo);
    // Registrar instante de comienzo del ciclo
    loop_timer = micros();
  
  if(identifier == "d"){
    motors();
  } else {
    // Procesar datos del sensor MPU6050
    PWM();
    readIMU(); 
    processData();       
    if (MODO_vuelo == 1)PID_ang();   // Obtener salida de los PID de inclinación
    PID_w();
    modulator();  
    
    saveForNextCycle();
  }
  debug();  
}
