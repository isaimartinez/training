void startBlinking();
void procesar();
void writeServo();
void startBlinking();

String buff;

void initBl() {
  BT.begin("Drone IMV"); // Nombre de tu Dispositivo Bluetooth y en modo esclavo
  Serial.println("El dispositivo Bluetooth está listo para emparejar");
  BT.register_callback(callback_function); // Registramos la función "callback_function" como función callback.
  pinMode (LED, OUTPUT); // Cambia el PIN del led a OUTPUT
}

void parser(String message) {
//    Serial.print("Msg: ");
//    Serial.print(message);
  
    if(message == "restart") {
      startBlinking();
      ESP.restart();
    }
    identifier = message.substring(19,20);
    if(identifier == "d"){
      pwrTL = message.substring(0, 4).toInt();
      pwrTR = message.substring(5, 9).toInt();
      pwrBL = message.substring(10,14).toInt();
      pwrBR = message.substring(15,19).toInt(); 
      writeServo();  
    }else if(identifier == "j"){
      wifiValue[ROL] = message.substring(0, 4).toInt();
      wifiValue[PIT] = message.substring(5, 9).toInt();
      wifiValue[THR] = message.substring(10, 14).toInt();
      wifiValue[RUD] = message.substring(15, 19).toInt();
      //procesar();
    }

}

void callback_function(esp_spp_cb_event_t event, esp_spp_cb_param_t *param) {
  if (event == ESP_SPP_START_EVT) {
    Serial.println("Inicializado SPP");
  }
  else if (event == ESP_SPP_SRV_OPEN_EVT ) {
    Serial.println("Cliente conectado");
    digitalWrite(LED, HIGH);
  }
  else if (event == ESP_SPP_CLOSE_EVT  ) {
    Serial.println("Cliente desconectado");
    digitalWrite(LED, LOW);
    wifiValue[ROL] = 1500;
    wifiValue[PIT] = 1500;
    wifiValue[THR] = 1000;
    wifiValue[RUD] = 1500;
  }
  else if (event == ESP_SPP_DATA_IND_EVT ) {
    while (BT.available()) { // Mientras haya datos por recibir
      int incoming = BT.read(); // Lee un byte de los datos recibidos
      if(incoming == 63) {
        parser(buff);
        buff = "";
      } else {
        buff = buff + String(char(incoming)); 
      }
    }
  }
}
