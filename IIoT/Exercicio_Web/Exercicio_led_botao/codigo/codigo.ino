#include <WiFi.h>

char ssid[] = "iotsenai123";
char senha[] = "iotsenai123";

WiFiServer server(80);

#define BTN 18
#define LED 22

bool estadoLED = false;

void setup() {
  Serial.begin(115200);

  pinMode(BTN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);

  conectawifi(ssid, senha);
  server.begin();

  Serial.println("WEB Server Inicializado");
}

void loop() {
  WiFiClient client = server.available();
  if (!client) return;

  Serial.println("Cliente conectado!");

  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();

  if (request.indexOf("/LED=ON") != -1) {
    estadoLED = true;
    digitalWrite(LED, HIGH);
  }
  if (request.indexOf("/LED=OFF") != -1) {
    estadoLED = false;
    digitalWrite(LED, LOW);
  }

  bool estadoBotao = digitalRead(BTN) == LOW; // pressionado = LOW

  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("Connection: close");
  client.println();

  client.println("<!DOCTYPE html>");
  client.println("<html lang='pt-br'>");

  client.println("<head>");
  client.println("<meta charset='UTF-8'>");
  client.println("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
  client.println("<meta http-equiv='refresh' content='2'>");
  client.println("<title>ESP32 Dashboard</title>");
  client.println("<style>");
  client.println("body { font-family: Arial; text-align: center; background: #0f172a; color: white; }");
  client.println(".card { background: #1e293b; padding: 20px; margin: 20px auto; width: 300px; border-radius: 15px; box-shadow: 0 0 10px #000; }");
  client.println(".btn { padding: 15px 25px; font-size: 18px; border: none; border-radius: 10px; cursor: pointer; }");
  client.println(".on { background: #22c55e; color: white; }");
  client.println(".off { background: #ef4444; color: white; }");
  client.println("</style>");
  client.println("</head>");

  client.println("<body>");

  client.println("<h1>Painel ESP32</h1>");

  client.println("<div class='card'>");
  client.println("<h2>Botão</h2>");
  if (estadoBotao) {
    client.println("<p style='color:#22c55e;'>Pressionado</p>");
  } else {
    client.println("<p style='color:#ef4444;'>Solto</p>");
  }
  client.println("</div>");

  client.println("<div class='card'>");
  client.println("<h2>LED</h2>");

  if (estadoLED) {
    client.println("<p style='color:#22c55e;'>Ligado</p>");
    client.println("<a href='/LED=OFF'><button class='btn off'>Desligar</button></a>");
  } else {
    client.println("<p style='color:#ef4444;'>Desligado</p>");
    client.println("<a href='/LED=ON'><button class='btn on'>Ligar</button></a>");
  }

  client.println("</div>");

  client.println("</body>");
  client.println("</html>");

  delay(10);
  client.stop();
  Serial.println("Cliente desconectado.");
}

void conectawifi(char SSID[], char senha[]) {
  Serial.print("Conectando a rede: ");
  Serial.println(SSID);

  WiFi.begin(SSID, senha);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}
