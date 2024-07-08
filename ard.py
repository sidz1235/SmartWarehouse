import serial
import time
import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import bson.objectid as bs

mongo_link = "MONGO_URL"
client = MongoClient(mongo_link, server_api=ServerApi('1'))
mydb = client["test"]
mycol = mydb["Temps"]

# Constant ObjectId for the room
ROOM_ID = bs.ObjectId("6627f2ea0338cc0f94ead092")



def readserial(comport, baudrate):
    ser = serial.Serial(comport, baudrate, timeout=0.4)  # 1/timeout is the frequency at which the port is read
    while True:
        data = ser.readline().decode().strip()
        try:
            if(len(data) <= 1 or "DHT" in data):
                data = []
            else:
                data = data.split("x")
        except:
            data = []
        if any(data):
            print(data, datetime.datetime.now())
            readings = {
                "Humidity": data[0],
                "TemperatureCelsius": data[1],
                "TemperatureFahrenheit": data[2],
                "HeatIndexCelsius": data[3],
                "HeatIndexFahrenheit": data[4],
                "Timestamp": datetime.datetime.now(),
                "roomid": ROOM_ID  # Adding the roomid field
            }
            mycol.insert_one(readings)
        time.sleep(4)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

readserial('COM3', 9600)
