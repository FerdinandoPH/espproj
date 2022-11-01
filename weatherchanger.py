import requests,json,time
# Read from GET https://api.openweathermap.org/data/2.5/weather?lat=40.488097&lon=-3.343781&appid=4a9f0193f2c492fb37368cbf04b93485, take the values of wather/main and main/temp and print them

def get_weather():
    url = "https://api.openweathermap.org/data/2.5/weather?lat=40.488097&lon=-3.343781&appid=4a9f0193f2c492fb37368cbf04b93485"
    response = requests.get(url)
    data = json.loads(response.text)
    status=response.status_code
    if status == 200:
        weather = data['weather'][0]['main']
        temp = round(data['main']['temp']-273,2)

        print(weather)
        print(temp)
    mainweather="https://api.thingspeak.com/update?api_key=E883ZKIT1R3NIRMV&field1="+str(weather)
    response2=requests.get(mainweather)
    while response2.text==0:
        print("retrying")
        response2=requests.get(mainweather)
        time.sleep(1)
    time.sleep(20)
    temp="https://api.thingspeak.com/update?api_key=E883ZKIT1R3NIRMV&field2="+str(temp)
    response3=requests.get(temp)
    while response3.text==0:
        print("retrying")
        response3=requests.get(temp)
        time.sleep(1)
    time.sleep(20)
while True:
    get_weather()