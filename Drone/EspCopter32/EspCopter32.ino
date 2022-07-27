#include <esp_now.h>
#include <WiFi.h>
#include <Servo.h>
#include <Wire.h>
#include <EEPROM.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "SPIFFS.h"
#include <Arduino_JSON.h>


#define led 5

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");
// Set your Static IP address
IPAddress local_IP(10, 77, 210, 1);
// Set your Gateway IP address
IPAddress gateway(10, 77, 0, 1);
IPAddress subnet(255, 255, 0, 0);

// Initialize SPIFFS
void initFS();

// Initialize WiFi
void initWiFi();
void initWebSocket();

bool flag = false;
int pwrTL = 1000; //tl
int pwrTR = 1000; //tr
int pwrBL = 1000; //bl
int pwrBR = 1000; //br

#include "RC.h"

#define PWMOUT  // normal esc, uncomment for serial esc
#define LED 5
#define CALSTEPS 256 // gyro and acc calibration steps

extern int16_t accZero[3];
extern float yawRate;
extern float rollPitchRate;
extern float P_PID;
extern float I_PID;
extern float D_PID;
extern float P_Level_PID;
extern float I_Level_PID;
extern float D_Level_PID;

volatile boolean recv;

void recv_cb(const uint8_t *macaddr, const uint8_t *data, int len)
{
  recv = true;
  //Serial.print("recv_cb ");
  //Serial.println(len); 
  if (len == RCdataSize) 
  {
    for (int i=0;i<RCdataSize;i++) RCdata.data[i] = data[i];
  }
};

#define ACCRESO 4096
#define CYCLETIME 3
#define MINTHROTTLE 1225
#define MIDRUD 1200 //1495
#define THRCORR 19

enum ang { ROLL,PITCH,YAW };

static int16_t gyroADC[3];
static int16_t accADC[3];
static int16_t gyroData[3];
static float angle[2]    = {0,0};  
extern int calibratingA;

#define ROL 0
#define PIT 1
#define THR 2
#define RUD 3

#define AU1 4
#define AU2 5
static int16_t rcCommand[] = {0,0,0};

#define GYRO     0
#define STABI    1
static int8_t flightmode;
static int8_t oldflightmode;

boolean armed = false;
uint8_t armct = 0;
int debugvalue = 0;

void setup() 
{
  Serial.begin(115200); Serial.println();
   // Configures static IP address
  if (!WiFi.config(local_IP, gateway, subnet)) {
    Serial.println("STA Failed to configure");
  }
  initFS();
  initWiFi();

  delay(3000); // give it some time to stop shaking after battery plugin
  MPU6050_init();
  MPU6050_readId(); // must be 0x68, 104dec
  
  EEPROM.begin(64);
  if (EEPROM.read(63) != 0x55) Serial.println("Need to do ACC calib");
  else ACC_Read(); // eeprom is initialized
  if (EEPROM.read(62) != 0xAA) Serial.println("Need to check and write PID");
  else PID_Read(); // eeprom is initialized

  //=========WIFI===========
  WiFi.mode(WIFI_STA); // Station mode for esp-now 

  //esp_now_register_recv_cb(recv_cb);

  delay(500); 
  pinMode(LED,OUTPUT);
  digitalWrite(LED,LOW);
  initServo();
  //============ INIT WEB SOCKET ===========
  initWebSocket();
  // Web Server Root URL
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });
  server.serveStatic("/", SPIFFS, "/");
  // Start server
  server.begin();
}

uint32_t rxt; // receive time, used for falisave

void loop() 
{
  uint32_t now,mnow,diff; 
  now = millis(); // actual time
  if (debugvalue == 5) mnow = micros();

//  if (recv)
//  {
//    recv = false;  
//    
//
//    if (debugvalue == 4) Serial.printf("%4d %4d %4d %4d \n", rcValue[0], rcValue[1], rcValue[2], rcValue[3]); 
//  
//    if      (rcValue[THR] < 1300) flightmode = GYRO;
//    else                          flightmode = STABI;   
//    if (oldflightmode != flightmode)
//    {
//      zeroGyroAccI();
//      oldflightmode = flightmode;
//    }
//
//    if (armed) 
//    {
//      rcValue[THR]    -= THRCORR;
//      rcCommand[ROLL]  = rcValue[ROL] - MIDRUD;
//      rcCommand[PITCH] = rcValue[PIT] - MIDRUD;
//      rcCommand[YAW]   = rcValue[RUD] - MIDRUD;
//    }  
//    else
//    {  
//      if (rcValue[THR] < MINTHROTTLE) armct++;
//      if (armct >= 25) 
//      { 
//        digitalWrite(LED,HIGH); 
//        armed = true;
//      }
//    }
//
//    if (debugvalue == 5) Serial.printf("RC input ms: %d\n",now - rxt);
//    rxt = millis();
//  }

  if      (rcValue[THR] < 1300) flightmode = GYRO;
  else                          flightmode = STABI; 

  rcValue[THR]    -= THRCORR;
  rcCommand[ROLL]  = rcValue[ROL] - MIDRUD;
  rcCommand[PITCH] = rcValue[PIT] - MIDRUD;
  rcCommand[YAW]   = rcValue[RUD] - MIDRUD;
  Gyro_getADC();
  
  ACC_getADC();

  getEstimatedAttitude();

  pid();

  mix();

  writeServo();
  
  // Failsave part
  if (now > rxt+90)
  {
    rcValue[THR] = MINTHROTTLE;
    if (debugvalue == 5) Serial.printf("RC Failsafe after %d \n",now-rxt);
    rxt = now;
  }

  // parser part
  if (Serial.available())
  {
    char ch = Serial.read();
    // Perform ACC calibration
    if (ch == 10) Serial.println();
    else if (ch == 'A')
    { 
      Serial.println("Doing ACC calib");
      calibratingA = CALSTEPS;
      while (calibratingA != 0)
      {
        delay(CYCLETIME);
        ACC_getADC(); 
      }
      ACC_Store();
      Serial.println("ACC calib Done");
    }
    else if (ch == 'R')
    {
      Serial.print("Act Rate :  ");
      Serial.print(yawRate); Serial.print("  ");
      Serial.print(rollPitchRate); Serial.println();
      Serial.println("Act PID :");
      Serial.print(P_PID); Serial.print("  ");
      Serial.print(I_PID); Serial.print("  ");
      Serial.print(D_PID); Serial.println();
      Serial.print(P_Level_PID); Serial.print("  ");
      Serial.print(I_Level_PID); Serial.print("  ");
      Serial.print(D_Level_PID); Serial.println();
    }
    else if (ch == 'D')
    {
      Serial.println("Loading default PID");
      yawRate = 6.0;
      rollPitchRate = 5.0;
      P_PID = 0.15;    // P8
      I_PID = 0.00;    // I8
      D_PID = 0.08; 
      P_Level_PID = 0.35;   // P8
      I_Level_PID = 0.00;   // I8
      D_Level_PID = 0.10;
      PID_Store();
    }
    else if (ch == 'W')
    {
      char ch = Serial.read();
      int n = Serial.available();
      if (n == 3)
      {
        n = readsernum();        
        if      (ch == 'p') { P_PID       = float(n) * 0.01 + 0.004; Serial.print("pid P ");       Serial.print(P_PID); }
        else if (ch == 'i') { I_PID       = float(n) * 0.01 + 0.004; Serial.print("pid I ");       Serial.print(I_PID); }
        else if (ch == 'd') { D_PID       = float(n) * 0.01 + 0.004; Serial.print("pid D ");       Serial.print(D_PID); }
        else if (ch == 'P') { P_Level_PID = float(n) * 0.01 + 0.004; Serial.print("pid Level P "); Serial.print(P_Level_PID); }
        else if (ch == 'I') { I_Level_PID = float(n) * 0.01 + 0.004; Serial.print("pid Level I "); Serial.print(I_Level_PID); }
        else if (ch == 'D') { D_Level_PID = float(n) * 0.01 + 0.004; Serial.print("pid Level D "); Serial.print(D_Level_PID); }
        else Serial.println("unknown command");
      }
      else if (ch == 'S') { PID_Store(); Serial.print("stored in EEPROM"); }
      else 
      {
        Serial.println("Input format wrong");
        Serial.println("Wpxx, Wixx, Wdxx - write gyro PID, example: Wd13");
        Serial.println("WPxx, WIxx, WDxx - write level PID, example: WD21");
      }
    }
    else if (ch >= '0' && ch <='9') debugvalue = ch -'0';
    else
    {
      Serial.println("A - acc calib");
      Serial.println("D - write default PID");
      Serial.println("R - read actual PID");
      Serial.println("Wpxx, Wixx, Wdxx - write gyro PID");
      Serial.println("WPxx, WIxx, WDxx - write level PID");
      Serial.println("WS - Store PID in EEPROM");
      Serial.println("Display data:");
      Serial.println("0 - off");
      Serial.println("1 - Gyro values");
      Serial.println("2 - Acc values");
      Serial.println("3 - Angle values");
      Serial.println("4 - RC values");
      Serial.println("5 - Cycletime");
    }
  }

  if      (debugvalue == 1) Serial.printf("%4d %4d %4d \n", gyroADC[0], gyroADC[1], gyroADC[2]);  
  else if (debugvalue == 2) Serial.printf("%5d %5d %5d \n", accADC[0], accADC[1], accADC[2]);
  else if (debugvalue == 3) Serial.printf("%3f %3f \n", angle[0], angle[1]); 
  
  delay(CYCLETIME-1);  

  if (debugvalue == 5) 
  {
    diff = micros() - mnow;
    Serial.println(diff); 
  }
}

int readsernum()
{
  int num;
  char numStr[3];  
  numStr[0] = Serial.read();
  numStr[1] = Serial.read();
  return atol(numStr);
}
