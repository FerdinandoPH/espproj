function ActualizaCampo(campo){
    //Actualiza el campo indicado desde thingspeak
    correspondencia=["luz","temperatura","humedad","pulsador","humedad_suelo","regando"];
    textoalprincipio=["Luz: ","Temperatura: ","Humedad: ","Pulsador: ","Humedad del suelo: ","Regando: "];
    var recibeCampos = new XMLHttpRequest();
    recibeCampos.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (campo==6){
                if (this.responseText=="0"){
                    document.getElementById(correspondencia[campo-1]).innerHTML = textoalprincipio[campo-1]+"No";
                }else{
                    document.getElementById(correspondencia[campo-1]).innerHTML = textoalprincipio[campo-1]+"Si";
                }
            }
            else{
            document.getElementById(correspondencia[campo-1]).innerHTML = textoalprincipio[campo-1]+this.responseText;
            }
        }
        };
    recibeCampos.open("GET", "https://api.thingspeak.com/channels/1896618/fields/"+campo+"/last.txt", true);
    recibeCampos.send();

    
    
}
function ActualizaTiempo(){
    //Recibe el tiempo desde openweather
    var recibeTiempo = new XMLHttpRequest();
    recibeTiempo.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tiempo = JSON.parse(this.responseText);
            console.log(tiempo);
            mensajeTiempo="Tiempo: "+tiempo.weather[0].description+"\nTemperatura: "+(tiempo.main.temp-273).toFixed(2)+"ºC\nHumedad: "+tiempo.main.humidity+"%\nViento: "+tiempo.wind.speed+"m/s";
            document.getElementById("tiempo").innerHTML = mensajeTiempo;
        }
        };
    recibeTiempo.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=40.488097&lon=-3.343781&appid=4a9f0193f2c492fb37368cbf04b93485", true);
    recibeTiempo.send();
}
function ActualizaDatos(){
    console.log("Actualizando datos a las "+new Date());
    for (i=2;i<7;i++){
        ActualizaCampo(i);
    }
    
}

window.onload=function(){
    //Esconde el párrafo de pulsador (era sólo de prueba)
    document.getElementById("pulsador").style.display="none";
    //Actualiza los datos cada 80 segundos
    ActualizaDatos();
    ActualizaTiempo();
    setInterval(ActualizaDatos, 80000);
    
}