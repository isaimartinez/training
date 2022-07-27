#include "BluetoothSerial.h"
#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

#define LED 5
BluetoothSerial BT; // Objeto Bluetooth


//=========BLE=========
void initBle();


void setup() {
  // put your setup code here, to run once:
  initBle();
}

void loop() {
  // put your main code here, to run repeatedly:

}
