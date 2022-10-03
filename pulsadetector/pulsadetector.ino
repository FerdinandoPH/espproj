#include <Arduino.h>

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(34,INPUT);
}
void loop(){
    int val = digitalRead(34);
    Serial.println(val);
    delay(1000);
}