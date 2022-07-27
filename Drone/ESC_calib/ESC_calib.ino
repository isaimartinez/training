#include <Servo.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "SPIFFS.h"
#include <Arduino_JSON.h>

#define MAX_SIGNAL 2000
#define MIN_SIGNAL 1000
#define MOTOR_PINTL 26 //TL
#define MOTOR_PINTR 33 //TR
#define MOTOR_PINBL 25 //BL
#define MOTOR_PINBR 32 //BR
#define led 5

bool flag = false;
int pwrTL = 1000; //tl
int pwrTR = 1000; //tr
int pwrBL = 1000; //bl
int pwrBR = 1000; //br

Servo motorTL;
Servo motorTR;
Servo motorBL;
Servo motorBR;
//==============================
// Initialize SPIFFS
void initFS();
// ========= WiFi =========
void initWiFi();
void initWebSocket();
void staticIp();
// ========= Motors =========
void initMotors();
//==============================

void setup() {
  Serial.begin(9600);
  Serial.println("Program begin...");
   // Configures static IP address
   staticIp();
  //initFS();
  initWiFi();
  delay(1500);
  initMotors();
  initWebSocket();

}

void loop() {
    //if (flag) { 
//      motorTL.writeMicroseconds(pwrTL);
//      motorTR.writeMicroseconds(pwrTR);
//      motorBL.writeMicroseconds(pwrBL);
//      motorBR.writeMicroseconds(pwrBR);
      flag = false;
    //}    
}
 
