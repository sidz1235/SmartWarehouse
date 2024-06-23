import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import './index.css';

export default function Layout(){
    
    return (
    <>
    
        
            <div className="fixed top-0 left-0 max-h-[30px] z-50">
                <Header/>
            </div>
            <div className="mt-20">
                <Outlet/>
            </div>
        
         
    
    </>
    )
}