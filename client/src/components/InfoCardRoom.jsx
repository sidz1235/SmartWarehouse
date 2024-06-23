import React from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";


export default function InfoCardRoom({ dict, temps, isRoom}) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function filterTemps(obj) {
        if(obj.roomid.toString() === dict._id.toString())
            return true;
        return false;
    }

    function filterTempsTime(maxTemp, currentTemp) {
        // Parse timestamps to compare them as dates
        const maxTimestamp = new Date(maxTemp.Timestamp);
        const currentTimestamp = new Date(currentTemp.Timestamp);
    
        // Return the object with the maximum timestamp
        return maxTimestamp > currentTimestamp ? maxTemp : currentTemp;
    }

    //console.log(temps.filter(filterTemps).sort((a, b) => {a.Timestamp < b.Timestamp}).at(-1));

    return (
        <div id="cards-section" className={`max-w-[1500px] flex m-auto space-y-10`}>
            <div className="rounded-xl bg-gray-900 h-auto text-white p-4 border-red-700 max-w-[600px]">
                <div>
                    <div className="items-center align-center m-auto font-bold text-xl font-mono">
                        {Object.entries(dict).map(([key, value]) => (
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
                                        <div><span className="text-red-600">{capitalizeFirstLetter(key)}: </span>{value.toString().slice(0, 40) + "..."}</div>
                                    </React.Fragment>
                                ) :
                                (
                                    <React.Fragment>
                                        <div><span className="text-red-600">{capitalizeFirstLetter(key)}: </span>{value}</div>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                        <div>
                            {isRoom && (<><br/><span className="text-2xl">Sensor Readings</span><br/></> )}
                            
                            {temps && Object.entries(temps.filter(filterTemps).sort((a, b) => {a.Timestamp < b.Timestamp}).at(-1)).map(([key, value]) => (
                            <React.Fragment key={key}>
                                {
                                key === "name" ? (
                                    <React.Fragment>
                                        <div className="text-3xl text-red-600">{value}</div><br/>
                                    </React.Fragment>
                                ) :
                                key == "_id" || key == "warehouseid" || key == "roomid" ? (
                                    <></>
                                ) :
                                key === "Timestamp" ? (
                                    <React.Fragment>
                                        <div className="text-red-600">{key}:</div><div>{value}</div>
                                    </React.Fragment>
                                ) :
                                key == "Humidity" ? (
                                    <React.Fragment>
                                        <div><span className="text-red-600">{capitalizeFirstLetter(key)}: </span>{value}%</div>
                                    </React.Fragment>
                                ) :
                                key == "TemperatureCelsius" || key === "HeatIndexCelsius" ? (
                                    <React.Fragment>
                                        <div><span className="text-red-600">{capitalizeFirstLetter(key)}: </span>{value}*C</div>
                                    </React.Fragment>
                                ) :
                                key == "TemperatureFahrenheit" || key === "HeatIndexFahrenheit" ? (
                                    <React.Fragment>
                                        <div><span className="text-red-600">{capitalizeFirstLetter(key)}: </span>{value}F</div>
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
            </div>
        </div>
    );
}
