import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import Warehouse1 from '../images/Warehouse1.jpg'
import Warehouse2 from '../images/Warehouse2.jpg'


export default function Home() {
    const Data1 = { type: "Warehouse1", image: Warehouse1,  path : "/warehouse" }
    const Data2 = { type: "Warehouse2", image: Warehouse2,  path : "/warehouse" }

    const [msg, setMsg] = useState('');
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const cardsSectionTop = document.getElementById('cards-section').offsetTop;
            const headerHeight = 200; // Adjust this value based on your header's height
            const scrollY = window.scrollY;

            console.log("Stuff", scrollY, cardsSectionTop, headerHeight);

            if (1) {
                setShowCards(true);
            } else {
                setShowCards(false);
            }
        };

       
    }, 300);

    return (
        <div className='flex flex-col justify-center items-center max-w-[1500px] mt-[70px]'>
            
            <div id="cards-section" className={` max-w-[1500px] flex justify-center flex-wrap h-[400px] m-4`}>
              
                <Link to="/warehouse" className='m-4'>
                    <Card Data={Data1} />
                </Link>
                <Link to="/warehouse" className='m-4'>
                    <Card Data={Data2} />
                </Link>
                
            </div>
        </div>
    )
}





