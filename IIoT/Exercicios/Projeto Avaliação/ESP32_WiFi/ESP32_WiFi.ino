#define BLYNK_PRINT Serial
#define BLYNK_TEMPLATE_ID "TMPL2KWqYrND9"
#define BLYNK_TEMPLATE_NAME "TurmaBIoT"
#define BLYNK_AUTH_TOKEN "Hg2VhTebIKdclCVJvQViNm21mBFfm9JI"

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

char ssid[] = "iotsenai123";
char pass[] = "iotsenai123";

const int btn       = 18;   
const int ledRed    = 22;  
const int ledYellow  = 19;  

bool estadoVirtual = false;        
unsigned long tempoDebounce = 0;
const unsigned long debounceDelay = 200;

unsigned long ultimotempopot;

void setup() {
  Serial.begin(9600);

  pinMode(btn, INPUT_PULLUP);
  pinMode(ledRed, OUTPUT);
  pinMode(ledYellow, OUTPUT);

  digitalWrite(ledRed, LOW);
  digitalWrite(ledYellow, LOW);

  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);

  // Garante que o LED virtual comece desligado no app
  Blynk.virtualWrite(V28, 0);
}

// ---- Recebe dados do botão V1 (LED vermelho) ----
BLYNK_WRITE(V29) {
  int valor = param.asInt();
  digitalWrite(ledRed, valor);
  Serial.print("LED Vermelho: ");
  Serial.println(valor);
}

// ---- Recebe dados do botão V2 (LED verde) ----
BLYNK_WRITE(V30) {
  int valor = param.asInt();
  digitalWrite(ledYellow, valor);
  Serial.print("LED Amarelo: ");
  Serial.println(valor);
}

void loop() {
  Blynk.run();

  // Botão físico com debounce -> alterna LED virtual V0
  if (digitalRead(btn) == LOW) {
    if ((millis() - tempoDebounce) > debounceDelay) {
      estadoVirtual = !estadoVirtual;
      Blynk.virtualWrite(V28, estadoVirtual ? 255 : 0); // LED widget usa 0/255
      Serial.print("LED Virtual V0: ");
      Serial.println(estadoVirtual);
    }
    tempoDebounce = millis();
  }

  float valorpot = analogRead(34);
  if ((millis() - ultimotempopot) > 5000) {
    Serial.println(valorpot);
    Blynk.virtualWrite(V27, valorpot);
    ultimotempopot = millis();
  }
}
