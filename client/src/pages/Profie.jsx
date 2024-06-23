import React, { useContext, useRef, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import WeatherDisplay from '../components/WeatherDisplay';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [warehouses, setWarehouses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [temps, setTemps] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(-1);
  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [alerts, setAlerts] = useState(-1);
  //console.log(user)

  function Warehousefilter(obj) {
      
    if (obj.company === user.companyName) {
      //console.log(obj.company);
      return true;
    }
    return false; // Return false if user or user.user.companyName is not defined
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    fetchWarehouses();
    fetchRooms();
    fetchTemps();
    
  }, []);

  const fetchWarehouses = async () => {
    try {
      
      const response = await axios.get('/warehouse'); // Replace '/warehouses' with your API endpoint
      const filteredWarehouses = response.data.filter(Warehousefilter);
      setWarehouses(filteredWarehouses);

      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRooms = async () => {
    try {
      
      const response = await axios.get('/room'); // Replace '/warehouses' with your API endpoint
      const filteredWarehouses = await response.data;
      setRooms(filteredWarehouses);
      
      
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

  function RoomFilter(obj, i) {
    if(obj.warehouseid.toString() == warehouses[i]._id.toString()){
      return true;
    }
    return false;
  }

  function TempFilter(obj) {
    if(obj.roomid.toString() === rooms.filter(RoomFilter).at(selectedRoom)._id.toString())
      return true;
    return false;
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  async function checkAlerts() {
    try {
      const alerts = [];
  
      for (let i = 0; i < warehouses.length; i++) {
        const filteredRooms = rooms.filter(obj => RoomFilter(obj, i));
  
        for (let j = 0; j < filteredRooms.length; j++) {
          setSelectedRoom(j);
  
          const filteredTemps = temps.filter(TempFilter);
          const sortedTemps = filteredTemps.sort((a, b) => b.Timestamp - a.Timestamp);
          const latestTemp = sortedTemps[0];
  
          if (
            latestTemp.TemperatureCelsius > filteredRooms[j].maxTemp ||
            latestTemp.TemperatureCelsius < filteredRooms[j].minTemp ||
            latestTemp.Humidity > filteredRooms[j].maxHumidity ||
            latestTemp.Humidity < filteredRooms[j].minHumidity
          ) {
            rooms.forEach(room => {
              if (room._id.toString() === latestTemp.roomid.toString()) {
                alerts.push({ room, temp: latestTemp, warehouse: warehouses[i] });
              }
            });
          }
        }
      }
  
      // After collecting all alerts, update the state
      setAlerts(alerts);
      console.log(alerts);

    } catch (error) {
      console.error('Error checking alerts:', error);
    }
  }

  useEffect(() => {
    checkAlerts();
  }, [temps])

  const handleLogout = async () => {
    try {
        await axios.post('/logout');
        setUser(null);
        window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <div className="mt-4 flex items-center justify-around w-full">
      <div className="mb-32 w-full">
        {
            user && (<div className='rounded-xl bg-gray-900 text-white p-4 border-red-700 w-full'>
              <span className='text-4xl text-center text-red-600'>User Profile</span><br/><br/>
            <h1 className="text-4xl text-center mb-4">Hello, {user.username}!</h1>
        
        <h1 className="text-2xl text-center mb-4"><span className='text-red-600'>User Type:</span> {capitalizeFirstLetter(user.userType)}</h1>
        <h1 className="text-2xl text-center mb-4"><span className='text-red-600'>Company Name:</span> {capitalizeFirstLetter(user.companyName)}</h1>
        <button className="primary max-w-md mx-auto border-red-700 border-2 p-4 rounded-xl text-xl hover:bg-red-600" onClick={handleLogout}>
          Logout
        </button>
        </div>
        )}
        <div className='rounded-xl bg-gray-900 text-white p-4 border-red-700 w-full mt-10'>
  <span className='text-3xl text-center text-red-600'>Alerts</span>
    {alerts != -1 ? 
      alerts.length > 0 
      ? (
        <div className="mt-4">
          {alerts.map((obj) => {
            return (
              <div key={obj._id} className='grid grid-cols-2 border-4 rounded-xl border-red-600 p-4'>
              <div><span className='text-2xl text-red-600'>Room Details</span><br/><br/>
              <span className='text-red-600'>Warehouse Name: </span>{obj.warehouse.name}<br/>
              <span className='text-red-600'>Room Name: </span>{obj.room.name}<br/>
              <span className='text-red-600'>Maximum Temperature: </span>{obj.room.maxTemp.toString() + "*C"}<br/>
              <span className='text-red-600'>Minimum Temperature: </span>{obj.room.minTemp.toString() + "*C"}<br/>
              <span className='text-red-600'>Maximum Humidity: </span>{obj.room.minHumidity.toString() + "%"}<br/>
              <span className='text-red-600'>Minimum Humidity: </span>{obj.room.maxHumidity.toString() + "%"}
              </div>
              <div><span className='text-2xl text-red-600'>Recordings</span><br/><br/>
              <span className='text-red-600'>Timestamp: </span>{obj.temp.Timestamp}<br/>
              <span className='text-red-600'>Temperature: </span>{obj.temp.TemperatureCelsius.toString() + "*C"}<br/>
              <span className='text-red-600'>Humidity: </span>{obj.temp.Humidity.toString() + "%"}<br/>
              </div>
              </div>
            )
          })}
        </div>
      )
      : (
        <div className="text-2xl text-center mt-4">
        No Alerts Detected
        </div>
      )
      :
      (
        <h1 className="text-2xl text-center mt-4">Loading Alerts...</h1>
      )
    }
</div>
        </div>
      </div>
  );
};

export default Profile;
