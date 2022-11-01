function ActualizaCampo(campo){
    //Display the data recevied from GEThttps://api.thingspeak.com/channels/1896618/fields/5/last.txt at the paragraph with id "humedad_suelo" 
    correspondencia=["luz","temperatura","humedad","pulsador","humedad_suelo"];
    textoalprincipio=["Luz: ","Temperatura: ","Humedad: ","Pulsador: ","Humedad del suelo: "];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(correspondencia[campo-1]).innerHTML = textoalprincipio[campo-1]+this.responseText;
        }
        };
    xhttp.open("GET", "https://api.thingspeak.com/channels/1896618/fields/"+campo+"/last.txt", true);
    xhttp.send();

    
    
}
function ActualizaTiempo(){
    // Display the data received from GET https://api.openweathermap.org/data/2.5/weather?lat=40.48&lon=-3.34}&appid=4a9f0193f2c492fb37368cbf04b93485 at the paragraph with id "tiempo"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tiempo = JSON.parse(this.responseText);
            console.log(tiempo);
            mensajeTiempo="Tiempo: "+tiempo.weather[0].description+"\nTemperatura: "+(tiempo.main.temp-273).toFixed(2)+"ºC\nHumedad: "+tiempo.main.humidity+"%\nViento: "+tiempo.wind.speed+"m/s";
            document.getElementById("tiempo").innerHTML = mensajeTiempo;
        }
        };
    xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=40.488097&lon=-3.343781&appid=4a9f0193f2c492fb37368cbf04b93485", true);
    xhttp.send();
}
function ActualizaDatos(){
    console.log("Actualizando datos a las "+new Date());
    for (i=1;i<6;i++){
        ActualizaCampo(i);
    }
    
}

window.onload=function(){
    ActualizaDatos();
    ActualizaTiempo();
    setInterval(ActualizaDatos, 80000);
    
}