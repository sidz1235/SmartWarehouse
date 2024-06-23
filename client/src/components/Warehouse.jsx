import React, { useState, useEffect, useContext } from "react";
import InfoCardWarehouse from "./InfoCardWarehouse";
import InfoCardRoom from "./InfoCardRoom";
import { UserContext } from "../UserContext";
import QRCode from "react-qr-code";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import axios from "axios";

export default function Warehouse() {
    const user = useContext(UserContext);

    const [selectedWarehouse, setSelectedWarehouse] = useState(-1);
    const [selectedRoom, setSelectedRoom] = useState(-1);
    const [selectedItem, setSelectedItem] = useState(-1);
    const [warehouses, setWarehouses] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [items, setItems] = useState([]);
    const [temps, setTemps] = useState([]);
    const [data, setData] = useState({});
    const [humidityData, setHumidityData] = useState({});
    const [heatIndexData, setHeatIndexData] = useState({});
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.7);

    //const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

    function Warehousefilter(obj) {
      
      if (obj.company === user.user.companyName) {
        console.log(obj.company);
        return true;
      }
      return false; // Return false if user or user.user.companyName is not defined
    }

    function Roomfilter(obj) {
      if(obj.warehouseid.toString() === warehouses[selectedWarehouse]._id.toString())
        return true;
      return false;
    }

    function Itemfilter(obj) {
      if(obj.roomid.toString() === rooms.filter(Roomfilter).at(selectedRoom)._id.toString())
        return true;
      return false;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
    
      const fetchWarehouses = async () => {
        try {
          
          const response = await axios.get('/warehouse'); // Replace '/warehouses' with your API endpoint
          const filteredWarehouses = await response.data.filter(Warehousefilter);
          setWarehouses(filteredWarehouses);
       
          
        } catch (error) {
          console.error(error);
        }
      };

      const fetchRooms = async () => {
        try {
          
          const response = await axios.get('/room'); // Replace '/warehouses' with your API endpoint
          const filteredWarehouses = response.data;
          setRooms(filteredWarehouses);
          
        } catch (error) {
          console.error(error);
        }
      };

      const fetchItems = async () => {
        try {
          
          const response = await axios.get('/item'); // Replace '/warehouses' with your API endpoint
          const filteredWarehouses = response.data;
          setItems(filteredWarehouses);
          
          
        } catch (error) {
          console.error(error);
        }
      };

      const fetchTemps = async () => {
        try {
          
          const response = await axios.get('/temp'); // Replace '/warehouses' with your API endpoint
          const filteredWarehouses = response.data;
          setTemps(filteredWarehouses);
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchWarehouses();
      fetchRooms();
      fetchItems();
      fetchTemps();
      
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setChartWidth(window.innerWidth * 0.7); // Adjust width based on window resize
      };
  
      window.addEventListener('resize', handleResize); // Listen to window resize events
  
      return () => {
        window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
      };
    }, []);

    const handleWarehouseSelect = async (warehouseName) => {
      setSelectedWarehouse(warehouseName);
      setSelectedRoom(-1);
      setSelectedItem(-1);

  };

    const handleRoomSelect = (roomName) => {
        setSelectedRoom(roomName);
        setSelectedItem(-1);

        const data = [];
        temps.filter((temp) => {
          return temp.roomid.toString() === rooms[roomName]._id.toString();
        })
        .sort((a, b) => {a.Timestamp < b.Timestamp})
        .map((temp) => {
          data.push({
            name: new Date(temp.Timestamp).toISOString().slice(0, 19).replace("T", "(") + ")", uv: parseFloat(temp.TemperatureCelsius), pv: 2400, amt: 2400,
          });
        });
        setData(data);

        const humidityData = [];
        temps.filter((temp) => {
          return temp.roomid.toString() === rooms[roomName]._id.toString();
        })
        .sort((a, b) => {a.Timestamp < b.Timestamp})
        .map((temp) => {
          humidityData.push({
            name: new Date(temp.Timestamp).toISOString().slice(0, 19).replace("T", "(") + ")", uv: parseFloat(temp.Humidity), pv: 2400, amt: 2400,
          });
        });
        setHumidityData(humidityData);

        const heatIndexData = [];
        temps.filter((temp) => {
          return temp.roomid.toString() === rooms[roomName]._id.toString();
        })
        .sort((a, b) => {a.Timestamp < b.Timestamp})
        .map((temp) => {
          heatIndexData.push({
            name: new Date(temp.Timestamp).toISOString().slice(0, 19).replace("T", "(") + ")", uv: parseFloat(temp.HeatIndexCelsius), pv: 2400, amt: 2400,
          });
        });
        setHeatIndexData(heatIndexData);

        
    };

    const handleItemSelect = (itemName) => {
        console.log(items.filter(Itemfilter).at(selectedItem).link.toString())
        setSelectedItem(itemName);
    };

    // Function to reset all states
    const resetStates = () => {
        setSelectedWarehouse(-1);
        setSelectedRoom(-1);
        setSelectedItem(-1);
    };

    useEffect(() => {
        resetStates(); // Reset all states when component mounts
    }, []);

    
    return (
        selectedWarehouse >= 0 ? (
            selectedRoom >= 0 ? (
                selectedItem >= 0 ? (
                  
                  <div id="cards-section" className={`max-w-[1500px] m-auto space-y-10`}>
                  <div className="rounded-xl bg-gray-900 text-white p-4 border-red-700 w-[1200px]">
                      <div>
                          <div className="items-center align-center m-auto font-bold text-2xl font-mono max-w-full">
                              {Object.entries(items.filter(Itemfilter).at(selectedItem)).map(([key, value]) => (
                                  <React.Fragment key={key}>
                                      {key === "coordinates" ? (
                                          <React.Fragment>
                                              Latitude: {value[0]},
                                              Longitude: {value[1]} <br />
                                          </React.Fragment>
                                      ) : 
                                      key === "name" ? (
                                          <React.Fragment>
                                              <div className="text-3xl text-red-600">{value}</div><br/>
                                          </React.Fragment>
                                      ) :
                                      key == "_id" || key == "warehouseid" || key == "roomid" || key == "link" ? (
                                          <></>
                                      ) :
                                      key == "description" ? (
                                          <React.Fragment>
                                              <br/>
                                              <div><span className="text-red-600">{capitalizeFirstLetter(key)} </span><br/>{value.toString()}</div>
                                          </React.Fragment>
                                      ) :
                                      (
                                          <React.Fragment>
                                              <div><span className="text-red-600">{capitalizeFirstLetter(key)}: </span>{value}</div>
                                          </React.Fragment>
                                      )}
                                  </React.Fragment>
                              ))}
                          </div>
          
                      </div>
                  </div>
                  <div className="w-[360px] m-auto border-8 border-gray-900 rounded-xl p-4 flex pt-8 pb-8 justify-center">
                    <QRCode value={items.filter(Itemfilter).at(selectedItem).link.toString()}/>
                  </div>
              </div>
                ) : (
                  <>
                    <h1 className="text-4xl text-center border-white-700 rounded-xl text-red-600 bg-gray-900 p-6 font-bold">Items</h1> <br/> <br/>
                    <div className="mb-10 flex justify-center space-x-2">
                      <InfoCardWarehouse dict={warehouses[selectedWarehouse]}/>
                      <InfoCardRoom dict={rooms.filter(Roomfilter).at(selectedRoom)} temps={temps} isRoom={true}/>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl p-6 border-white-700 mb-10 justify-center">
                    <h1 className="text-4xl text-center border-white-700 rounded-xl text-red-600 bg-gray-900 p-6 font-bold">Temperature Graph</h1> <br/>
                    <LineChart width={chartWidth} height={350} data={data}>
                      <Line type="monotone" dataKey="uv" stroke="#e81f10" />
                      <CartesianGrid stroke="#ffffff" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl p-6 border-white-700 mb-10 justify-center">
                    <h1 className="text-4xl text-center border-white-700 rounded-xl text-red-600 bg-gray-900 p-6 font-bold">Humidity Graph</h1> <br/>
                    <LineChart width={chartWidth} height={350} data={humidityData}>
                      <Line type="monotone" dataKey="uv" stroke="#e81f10" />
                      <CartesianGrid stroke="#ffffff" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl p-6 border-white-700 mb-10 justify-center">
                    <h1 className="text-4xl text-center border-white-700 rounded-xl text-red-600 bg-gray-900 p-6 font-bold">Heat Index Graph</h1> <br/>
                    <LineChart width={chartWidth} height={350} data={heatIndexData}>
                      <Line type="monotone" dataKey="uv" stroke="#e81f10" />
                      <CartesianGrid stroke="#ffffff" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart>
                    </div>
                    <div className="flex space-x-6">
                        {items.filter(Itemfilter).map((item, index) => (
                            <React.Fragment key={index}>
                                <button onClick={() => handleItemSelect(index)} className="flex">
                                    <InfoCardRoom dict={item} temps = {null} isRoom={false}/>
                                </button>
                                <br/><br/>
                            </React.Fragment>
                        ))}
                    </div>
                  </>
                )
            ) : (
              <>
              <h1 className="text-4xl text-center border-white-700 rounded-xl text-red-600 bg-gray-900 p-6 font-bold">Rooms</h1> <br/> <br/>
                <div className="mb-10">
                  <InfoCardWarehouse dict={warehouses[selectedWarehouse]}/>
                </div>
                <div>
                </div>
                <div className="flex space-x-6">
                    {rooms.filter(Roomfilter).map((room, index) => (
                        <React.Fragment key={index}>
                            <button onClick={() => handleRoomSelect(index)} className="flex">
                                <InfoCardRoom dict={room} temps = {temps} isRoom={true}/>
                            </button>
                            <br/><br/>
                        </React.Fragment>
                    ))}
                </div>
              </>
            )
        ) : (
            <div>
              <h1 className="text-4xl text-center border-white-700 rounded-xl text-red-600 bg-gray-900 p-6 font-bold">Warehouses</h1> <br/> <br/>
                {warehouses.map((warehouse, index) => (
                    <React.Fragment key={index}>
                        <button onClick={() => handleWarehouseSelect(index)} className="w-full">
                            <InfoCardWarehouse dict={warehouse} />
                        </button>
                        <br/><br/>
                    </React.Fragment>
                ))}
            </div>
        )
    );
}
