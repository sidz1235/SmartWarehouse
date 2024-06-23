import React from "react";
import Card from "./Card";
import Warehouse1 from '../images/Warehouse1.jpg';
import { Link } from "react-router-dom";

export default function InfoCard({ dict, onSelect }) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleCardClick = () => {
        onSelect(dict.name);
    };

    const Data1 = { type: "Warehouse1", image: Warehouse1, path: "/warehouse" };

    return (
        <div id="cards-section" className={`max-w-[1500px] w-full m-auto space-y-10`}>
            <div className="rounded-xl bg-gray-900 h-[400px] text-white p-4 border-red-700" onClick={handleCardClick}>
                <Link to="/warehouse" className="grid grid-cols-2 h-[360px]">
                    <div className="items-center align-center m-auto font-bold text-xl font-mono">
                        {Object.entries(dict).map(([key, value]) => (
                            <React.Fragment key={key}>
                                {key === "coordinates" ? (
                                    <React.Fragment>
                                        Latitude: {value[0]},
                                        Longitude: {value[1]} <br />
                                    </React.Fragment>
                                ) : key === "capacity" ? (
                                    <React.Fragment>
                                        Small: {value[0]}, Medium: {value[1]}, Large: {value[2]} <br />
                                    </React.Fragment>
                                ) : (
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
                </Link>
            </div>
        </div>
    );
}
