import requests,json,time
# Read from GET https://api.openweathermap.org/data/2.5/forecast?lat=40.488097&lon=-3.343781&appid=4a9f0193f2c492fb37368cbf04b93485, take the value pop of the next day at 12:00 and return it

def get_weather(datos=False):
    url="https://api.openweathermap.org/data/2.5/forecast?lat=40.488097&lon=-3.343781&appid=4a9f0193f2c492fb37368cbf04b93485"
    response=requests.get(url)
    data=response.json()
    hourIndex=0
    for i in range(0,len(data["list"])):
        if data["list"][i]["dt_txt"][11:13]=="12" and data["list"][i]["dt_txt"][8:10]==str(int(time.strftime("%d"))+1):
            hourIndex=i
            break
    if datos:
        print(data)
        print("\n\n")
        print(data["list"][hourIndex])
    #Get the probability of rain for the next day at 12:00. The data is in 3 hour intervals, so determine the index of the next day at 12:00
    #The data is in 3 hour intervals, so determine the index of the next day at 12:00


    pop=data["list"][hourIndex]["pop"]
    
    print(pop)
    #Now send pop to GET https://api.thingspeak.com/update?api_key=E883ZKIT1R3NIRMV&field1=0
    url="https://api.thingspeak.com/update?api_key=E883ZKIT1R3NIRMV&field1="+str(pop)
    response=requests.get(url)
    if response.status_code==200:
        print("OK")
    else:
        while response.status_code!=200:
            print("Reintentando")
            response=requests.get(url)
            print(response.status_code)
            time.sleep(1)
            
    time.sleep(86300)
if __name__=="__main__":
    while True:
        get_weather()

