#include <Arduino.h>
#define ROJO 25
#define AMARILLO 26
#define VERDE 27
#define BOTON 33
//Enciende una luz en el puerto ROJO, luego espera 1 segundo y la apaga
//Después, enciende una luz en el puerto AMARILLO, espera 1 segundo y la apaga
//Después, enciende una luz en el puerto VERDE, espera 1 segundo y la apaga
int currled=2;
bool pulsado=false;
void enciendeLeds(int led){
  switch(led%3){
    case 0:
      digitalWrite(ROJO,HIGH);
      digitalWrite(AMARILLO,LOW);
      digitalWrite(VERDE,LOW);
      break;
    case 1:
      digitalWrite(ROJO,LOW);
      digitalWrite(AMARILLO,HIGH);
      digitalWrite(VERDE,LOW);
      break;
    case 2:
      digitalWrite(ROJO,LOW);
      digitalWrite(AMARILLO,LOW);
      digitalWrite(VERDE,HIGH);
      break;
  }

}
void setup() {
  pinMode(ROJO, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(VERDE, OUTPUT);
  pinMode(BOTON, INPUT_PULLUP);
  Serial.begin(9600);
}
void loop() {
  if (Serial.available()>0){
    String res=Serial.readString();
    Serial.println(res);
      if(res[0]=='R'){
        digitalWrite(ROJO,HIGH);
        digitalWrite(AMARILLO,LOW);
        digitalWrite(VERDE,LOW);
      }
      else if(res[0]=='A'){
        digitalWrite(ROJO,LOW);
        digitalWrite(AMARILLO,HIGH);
        digitalWrite(VERDE,LOW);
      }
      else if(res[0]=='V'){
        digitalWrite(ROJO,LOW);
        digitalWrite(AMARILLO,LOW);
        digitalWrite(VERDE,HIGH);
      }  
  }
  
  if(digitalRead(BOTON)==HIGH && !pulsado){
    pulsado=true;
    currled++;
    Serial.println(currled%3);
    enciendeLeds(currled);
  }
  else if(digitalRead(BOTON)==LOW && pulsado){
    pulsado=false;
    Serial.println("Pulsado");
  }
  
}