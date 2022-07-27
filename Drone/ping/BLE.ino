String buff;
void initBle() {
  Serial.begin(9600); // Inicializando la conexión serial para debug
  BT.begin("Drone IMV"); // Nombre de tu Dispositivo Bluetooth y en modo esclavo
  Serial.println("El dispositivo Bluetooth está listo para emparejar");
  BT.register_callback(callback_function); // Registramos la función "callback_function" como función callback.
  pinMode (LED, OUTPUT); // Cambia el PIN del led a OUTPUT
}

void parser(String message) {
  Serial.print("Msg: ");
  Serial.println(message);
  
  if(message == "restart") {
      Serial.println("restarting...");
      ESP.restart();
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
  }
  else if (event == ESP_SPP_DATA_IND_EVT ) {
    Serial.println("Datos recibidos");
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
