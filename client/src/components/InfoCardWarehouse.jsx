import React from "react";
import Card from "./Card";
import Warehouse1 from '../images/Warehouse1.jpg';
import WeatherDisplay from "./WeatherDisplay";
import { useParams } from "react-router-dom";


export default function InfoCardWarehouse({ dict }) {

    const warehouse = useParams();


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const Data1 = { type: "Warehouse1", image: Warehouse1, path: "/warehouse" };

    return (
        <div id="cards-section" className={`max-w-[1500px] m-auto space-y-10`}>
            <div className="rounded-xl bg-gray-900 text-white p-4 border-red-700">
                <div className="grid grid-cols-2">
                    <div className="items-center align-center m-auto font-bold text-xl font-mono">
                        {Object.entries(dict).map(([key, value]) => (
                            <React.Fragment key={key}>
                                {key === "coordinates" ? (
                                    <React.Fragment>
                                        Latitude: {value[0]},
                                        Longitude: {value[1]} <br />
                                        <WeatherDisplay lat={value[0]} lon={value[1]} apiKey={"fb9bbc4820096d4137b03755624c8031"}/>
                                    </React.Fragment>
                                ) : key === "capacity" ? (
                                    <React.Fragment>
                                        <span className="text-xl text-red-600">Capacities</span><br/>Small: {value[0]}, Medium: {value[1]}, Large: {value[2]} <br />
                                    </React.Fragment>
                                ) : 
                                key === "name" ? (
                                    <React.Fragment>
                                        <div className="text-3xl text-red-600">{value}</div><br/>
                                    </React.Fragment>
                                ) :
                                key === "_id" ? (
                                    <></>
                                ) :
                                (
                                    <React.Fragment>
                                        <div><span className="text-red-600">{capitalizeFirstLetter(key)}: </span>{value}</div>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="m-auto items-center border-4 rounded-xl">
                        <Card Data={Data1} />
                    </div>
                </div>
            </div>
        </div>
    );
}
