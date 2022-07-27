
String buff;
int count = 0;
bool waitingPid = false;


void parsePid () {
  int xra = raRaw.indexOf(",") + 1;
  int yra = raRaw.lastIndexOf(",") +1;
  Roll_ang_Kp = raRaw.substring(0,xra).toFloat();
  Roll_ang_Ki = raRaw.substring(xra, yra).toFloat();
  Roll_ang_Kd = raRaw.substring(yra).toFloat();

  int xpa = paRaw.indexOf(",") + 1;
  int ypa = paRaw.lastIndexOf(",") + 1;
  Pitch_ang_Kp = paRaw.substring(0,xpa).toFloat();
  Pitch_ang_Ki = paRaw.substring(xpa, ypa).toFloat();
  Pitch_ang_Kd = paRaw.substring(ypa).toFloat();

  int xpw = pwRaw.indexOf(",") + 1;
  int ypw = pwRaw.lastIndexOf(",") + 1;
  Pitch_W_Kp = pwRaw.substring(0,xpw).toFloat();
  Pitch_W_Ki = pwRaw.substring(xpw, ypw).toFloat();
  Pitch_W_Kd = pwRaw.substring(ypw).toFloat();

  int xrw = rwRaw.indexOf(",") + 1;
  int yrw = rwRaw.lastIndexOf(",") + 1;
  Roll_W_Kp = rwRaw.substring(0,xrw).toFloat();
  Roll_W_Ki = rwRaw.substring(xrw, yrw).toFloat();
  Roll_W_Kd = rwRaw.substring(yrw).toFloat();

  int xyw = ywRaw.indexOf(",") + 1;
  int yyw = ywRaw.lastIndexOf(",") + 1;
  Yaw_W_Kp = ywRaw.substring(0,xyw).toFloat();
  Yaw_W_Ki = ywRaw.substring(xyw, yyw).toFloat();
  Yaw_W_Kd = ywRaw.substring(yyw).toFloat();

//  Serial.print("Roll_ang_Kp");
//  Serial.println(Roll_ang_Kp);
//  Serial.print("Roll_ang_Ki");
//  Serial.println(Roll_ang_Ki);
//  Serial.print("Roll_ang_Kp");
//  Serial.println(Roll_ang_Kd);
//
//  Serial.print("Pitch_ang_Kp");
//  Serial.println(Pitch_ang_Kp);
//  Serial.print("Pitch_ang_Ki");
//  Serial.println(Pitch_ang_Ki);
//  Serial.print("Pitch_ang_Kd");
//  Serial.println(Pitch_ang_Kd);
//  
//  Serial.print("Pitch_W_Kp");
//  Serial.println(Pitch_W_Kp);
//  Serial.print("Pitch_W_Ki");
//  Serial.println(Pitch_W_Ki);
//  Serial.print("Pitch_W_Kd");
//  Serial.println(Pitch_W_Kd);
//  
//  Serial.print("Roll_W_Kp");
//  Serial.println(Roll_W_Kp);
//  Serial.print("Roll_W_Ki");
//  Serial.println(Roll_W_Ki);
//  Serial.print("Roll_W_Kd");
//  Serial.println(Roll_W_Kd);
//  
//  Serial.print("Yaw_W_Kp");
//  Serial.println(Yaw_W_Kp);
//  Serial.print("Yaw_W_Ki");
//  Serial.println(Yaw_W_Ki);
//  Serial.print("Yaw_W_Kd");
//  Serial.println(Yaw_W_Kd);
  

  
}

void sendPid() {
  
  BT.println("init");
  BT.println(raRaw);
  BT.println(paRaw);
  BT.println(pwRaw);
  BT.println(rwRaw);
  BT.println(ywRaw);
  BT.println("end");
}

void parser(String message) {
    Serial.print("Msg: ");
    Serial.print(message);
    if(message == "GET_PID") {
      sendPid();
    } else if(message == "PID") {
      //wait for the 5 lines
      waitingPid = true;
    } else if(waitingPid) {
      Serial.println("waitingPid");
      switch (count) {
        case 0:
          
          Serial.println(0);
          raRaw = message;
          break;
        case 1:
          Serial.println(1);
          paRaw = message;
          break;
        case 2:
          Serial.println(2);
          pwRaw = message;
          break;
        case 3:
          Serial.println(3);
          rwRaw = message;
          break;
        case 4:
          Serial.println(4);
          ywRaw = message;
          waitingPid = false;
          count = 0;
          parsePid();
          break;
         
        default:
          // statements
          Serial.println("default");
      }
      count = count +1;
    } else if(message == "restart") {
      Serial.println("restarting");
    } else {
      Serial.println("handle another stuff");
    }
}

void initBl() {
  BT.begin("Drone IMV"); // Nombre de tu Dispositivo Bluetooth y en modo esclavo
  Serial.println("El dispositivo Bluetooth está listo para emparejar");
  BT.register_callback(callback_function); // Registramos la función "callback_function" como función callback.
  pinMode (LED, OUTPUT); // Cambia el PIN del led a OUTPUT
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
