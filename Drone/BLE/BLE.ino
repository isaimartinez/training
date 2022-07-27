#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <Preferences.h>
#include <WiFi.h>

#define SERVICE_UUID        "6fb23cbc-e39a-11ec-8fea-0242ac120002"
#define CHARACTERISTIC_UUID "6fb23f1e-e39a-11ec-8fea-0242ac120002"

#define led 5
const int buttonPin = 0; 
int buttonState = 0;
bool connecting = false;

Preferences preferences;

String ssid;
String password;

void saveData(const char* s, const char* p);
void startBlinking();
void stopWiFi();
void onBtnPressed();

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();
      String ble_str = "";
      if (value.length() > 0) {
        Serial.println("*********");
        Serial.print("New value: ");
        for (int i = 0; i < value.length(); i++){
          ble_str = ble_str + value[i];
        }
        //s:23456,p:dostc
        Serial.println(ble_str);
        
        int first = ble_str.indexOf(":");
        int last =  ble_str.lastIndexOf(":");
        
        String s = ble_str.substring(first+1,last-2);
        String p = ble_str.substring(last+1);

        
        Serial.print("s: ");
        Serial.println(s);
        Serial.print("p: ");
        Serial.println(p);
        
        saveData(s.c_str(), p.c_str());
        Serial.println("*********");
      }
    }
};

void initBle(){
  
  Serial.println("Ble starting");
  BLEDevice::init("Drone");
  BLEServer *pServer = BLEDevice::createServer();

  BLEService *pService = pServer->createService(SERVICE_UUID);

  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  pCharacteristic->setCallbacks(new MyCallbacks());

  pCharacteristic->setValue("Hello World");
  pService->start();

  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->start();
}

void setup() {
  Serial.begin(115200);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  pinMode(led, OUTPUT);
  initPref();

}

void loop() {
  onBtnPressed();
  delay(200);
}
