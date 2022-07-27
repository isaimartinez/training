#include <Servo.h>
#include <EnableInterrupt.h>

#define MAX_SIGNAL 2000
#define MIN_SIGNAL 1000
#define MOTOR_PIN 26 //Motor Central
#define pin_INT_Throttle 8  // Pin Throttle del mando RC
#define pin_INT_Yaw 7       // Pin Yaw del mando RC
#define pin_INT_Pitch 12    // Pin Pitch del mando RC
#define pin_INT_Roll 9      // Pin Roll del mando RC

int pwrM = 1000; //tl

// TIEMPOS
long tiempo_motores_start, loop_timer;

// DEBUG
int debugvalue = 0;

// AJUSTE MANDO RC - THROTLLE
const int us_max_Throttle_adj = 1800;
const int us_min_Throttle_adj = 970;
const float us_max_Throttle_raw = 2004;
const float us_min_Throttle_raw = 1116;

// AJUSTE MANDO RC - PITCH
const float us_max_Pitch_raw = 1952;
const float us_min_Pitch_raw = 992;
const int us_max_Pitch_adj = -30;
const int us_min_Pitch_adj = 30;

// AJUSTE MANDO RC - ROLL
const float us_max_Roll_raw = 1960;
const float us_min_Roll_raw = 992;
const int us_max_Roll_adj = 30;
const int us_min_Roll_adj = -30;

// AJUSTE MANDO RC - YAW
const float us_max_Yaw_raw = 1928;
const float us_min_Yaw_raw = 972;
const int us_max_Yaw_adj = 30;
const int us_min_Yaw_adj = -30;

// MANDO RC
float RC_Throttle_filt, RC_Pitch_filt, RC_Yaw_filt, RC_Roll_filt;
float RC_Throttle_consigna, RC_Pitch_consigna, RC_Roll_consigna, RC_Yaw_consigna;

// LEER MANDO RC - TROTTLE
volatile long Throttle_HIGH_us;
volatile int RC_Throttle_raw;

// INTERRUPCIÓN MANDO RC - PITCH
volatile long Pitch_HIGH_us;
volatile int RC_Pitch_raw;

// INTERRUPCIÓN MANDO RC - ROLL
volatile long Pitch_Roll_us;
volatile int RC_Roll_raw;

// INTERRUPCIÓN MANDO RC - YAW
volatile long Pitch_Yaw_us;
volatile int RC_Yaw_raw;

Servo motor;

#define usCiclo 6000 

// ========= Motors =========
void initMotors();
void PWM();
void modulador();

// ========= RC =========
void initRC();

// ========= Debug =========
void debug();

void setup() {
  Serial.begin(9600);
  Serial.println("Program begin...");
  initRC();
  initMotors();
  loop_timer = micros();
}

void loop() {
  
    while (micros() - loop_timer < usCiclo);
    loop_timer = micros();

    PWM(); //Generar señales PWM
    modulador(); //Modula señales PWM

    debug();
}
