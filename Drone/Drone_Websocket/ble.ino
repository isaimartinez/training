void saveData(const char* s, const char* p);

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
  
  pinMode(buttonPin, INPUT);
  BLEDevice::init("Drone");
  BLEServer *pServer = BLEDevice::createServer();

  BLEService *pService = pServer->createService(SERVICE_UUID);

  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  pCharacteristic->setCallbacks(new MyCallbacks());

  pCharacteristic->setValue("");
  pService->start();

  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->start();
}
